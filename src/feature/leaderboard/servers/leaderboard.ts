"use server";

import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "@/lib/data";
import db from "../../../../db/db";
import { Rank } from "@/types/rank";

export const getLeaderboard = async (searchParams?: any) => {
  try {
    const { page, size, search, quiz_date } = searchParams;
    const validatedSize = size ? Number(size) : DEFAULT_PAGE_SIZE;
    const validatedPage = page ? Number(page) : DEFAULT_PAGE;

    const offset = (validatedPage - 1) * validatedSize;

    let baseQuery = `
            WITH ranked_users AS (
              SELECT d.name,
                  d.mobile,
                  d.email,
                  IFNULL(
                      (
                          SELECT SUM(r.mark)
                          FROM quiz_submit r
                              LEFT JOIN quiz q ON q.id = r.quiz_id
                              LEFT JOIN quiz_group g ON g.id = q.group_id
                          WHERE r.user_id = d.id
                      ),
                      0
                  ) AS total_mark,
                  IFNULL(
                      (
                          SELECT SUM(t.duration_s)
                          FROM group_user t
                              LEFT JOIN quiz_group g ON g.id = t.group_id
                          WHERE t.user_id = d.id
                      ),
                      0
                  ) AS total_duration,
                  IF(
                      (
                          IFNULL(
                              (
                                  SELECT SUM(t.duration_s)
                                  FROM group_user t
                                      LEFT JOIN quiz_group g ON g.id = t.group_id
                                  WHERE t.user_id = d.id
                              ),
                              0
                          )
                      ) > 0,
                      1,
                      0
                  ) AS is_participated,
                  RANK() OVER (
                      ORDER BY total_mark DESC,
                          is_participated DESC,
                          total_duration ASC
                  ) AS rank
              FROM user d
          )
          SELECT *
          FROM ranked_users
        `;

    const params: any[] = [];

    // Add search condition if `search` is non-empty
    if (search && search.trim() !== "") {
      baseQuery += ` WHERE mobile LIKE ? OR name LIKE ?`;
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm);
    }

    // Push quiz_date if it exists (3 times for each subquery)
    if (quiz_date) {
      params.push(quiz_date, quiz_date, quiz_date);
    }

    // Add pagination
    baseQuery += ` LIMIT ?, ?`;
    params.push(offset, validatedSize);

    const res = await db.$queryRawUnsafe(baseQuery, ...params);

    return {
      data: res as Rank[],
      error: null,
      page: validatedPage,
      size: validatedSize,
    };
  } catch (error) {
    console.error(error);
    return {
      data: [],
      error:
        (error as Error).message.split("\n").pop() || "Something went wrong",
      page: 1,
      size: 1,
    };
  }
};
