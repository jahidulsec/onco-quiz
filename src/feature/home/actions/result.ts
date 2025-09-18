"use server";

import db from "../../../../db/db";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "@/lib/data";

export const getResults = async (searchParams: any) => {
  const { page, size, search, quiz_date } = await searchParams;
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

  try {
    const [data, count, questionCount] = await Promise.all([
      db.$queryRawUnsafe(baseQuery, ...params),
      db.user.count({
        where: {
          ...(search && {
            OR: [
              {
                name: {
                  contains: search as string,
                },
              },
              {
                mobile: {
                  contains: search as string,
                },
              },
            ],
          }),
        },
      }),
      db.quiz.count({}),
    ]);

    return {
      data: data as any,
      error: null,
      count: count,
      page: validatedPage,
      size: validatedSize,
      questionCount: questionCount,
    };
  } catch (error) {
    console.log(error);
    return {
      data: [],
      error: error as Error,
      count: 0,
      page: validatedPage,
      size: validatedSize,
      questionCount: 0,
    };
  }
};
