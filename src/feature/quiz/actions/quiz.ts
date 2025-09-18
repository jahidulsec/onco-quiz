"use server";

import { z } from "zod";
import db from "../../../../db/db";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { validationError } from "@/lib/helper";

const quizSubmitSchema = z.object({
  quiz_id: z.string(),
  user_id: z.string(),
  group_id: z.string(),
  answer: z.string().min(1, "Give your answer"),
  correct_answer: z.string().min(1, "Give your answer"),
});

const quizzesSubmitSchema = z.object({
  data: z.array(quizSubmitSchema),
});

export const submitQuizzes = async (response: any[]) => {
  const res = response;
  try {
    const result = quizzesSubmitSchema.safeParse({ data: res });

    if (result.success === false) {
      return validationError(result.error.issues);
    }

    const data = result.data.data;

    const response = await db.quiz_submit.createMany({
      data: data.map((item) => {
        const { group_id, correct_answer, ...rest } = item;
        return {
          ...rest,
          mark:
            rest.answer.toLowerCase() === correct_answer.toLowerCase() ? 1 : 0,
        };
      }),
    });

    // get paritcipation data
    const participatedData = await db.group_user.findFirst({
      where: {
        user_id: result.data.data[0].user_id,
        group_id: result.data.data[0].group_id,
      },
    });

    const currentTime = new Date();
    const duration =
      currentTime.getTime() - Number(participatedData?.start_date.getTime());

    // submit end date in participation
    await db.group_user.update({
      where: {
        id: participatedData?.id,
      },
      data: {
        duration_s: duration / 1000,
        end_date: currentTime,
      },
    });

    console.log('hello')

    revalidatePath("/preview");
    revalidatePath("/");
    revalidatePath("/quiz");

    return {
      error: null,
      success: "Quiz is successfully submitted",
      toast: null,
      response: response,
    };
  } catch (error) {
    console.error(error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return {
          error: null,
          success: null,
          toast: `You already participated`,
        };
      }
    }
    return {
      error: null,
      success: null,
      toast: (error as any).message,
    };
  }
};
