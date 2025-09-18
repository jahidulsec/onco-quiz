"use server";

import { Prisma } from "@prisma/client";
import { z } from "zod";
import db from "../../../../db/db";
import { validationError } from "@/lib/helper";

const participateSchema = z.object({
  group_id: z.string(),
  user_id: z.string(),
});

type ParticipateType = z.infer<typeof participateSchema>;

export const addParticipate = async (res: ParticipateType) => {
  try {
    const result = participateSchema.safeParse(res);

    if (result.success === false) {
      return {
        error: validationError(result.error.issues),
        success: null,
        toast: null,
      };
    }

    const response = await db.group_user.create({
      data: { ...res, start_date: new Date() },
    });

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
