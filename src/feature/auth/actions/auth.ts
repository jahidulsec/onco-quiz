"use server";

import { z } from "zod";
import db from "../../../../db/db";
import { createSession, deleteSession } from "@/lib/session";
import { validationError } from "@/lib/helper";

const loginSchema = z.object({
  name: z.string().min(3, { message: "At least 3 characters" }),
  email: z.email(),
  mobile: z.string().min(11, { message: "At least 11 characters" }),
  institute: z.string().min(3, { message: "At least 3 characters" }),
});

export const loginUser = async (prevState: unknown, formData: FormData) => {
  const modifiedFormData = Object.fromEntries(formData.entries());

  try {
    const result = loginSchema.safeParse(modifiedFormData);

    if (result.success === false) {
      return {
        error: validationError(result.error.issues),
        success: null,
        toast: null,
        values: modifiedFormData,
      };
    }

    const data = result.data;

    // check admin
    const user = await db.user.upsert({
      where: {
        email: data.email,
      },
      create: {
        name: data.name,
        email: data.email,
        mobile: data.mobile,
        institute: data.institute,
      },
      update: {},
    });

    // create session
    await createSession({
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      role: "user",
      id: user.id,
    });

    return {
      error: null,
      success: "Account is logged in successfully",
      toast: null,
    };
  } catch (error) {
    console.error(error);
    return {
      error: null,
      success: null,
      toast: (error as any).message,
      values: modifiedFormData,
    };
  }
};

export const logout = async () => {
  try {
    await deleteSession();

    return {
      success: "Your are successfully logged out",
      error: null,
    };
  } catch (error) {
    return {
      success: "Your are successfully logged out",
      error: (error as any).message,
    };
  }
};
