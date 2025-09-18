"use server";

import { z } from "zod";
import db from "../../../../db/db";
import { createSession, deleteSession } from "@/lib/session";
import { validationError } from "@/lib/helper";

const loginSchema = z.object({
  password: z.string().min(6, { message: "At least 6 characters" }),
  email: z.email(),
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
    const user = await db.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      throw { message: "User does not exists" };
    }

    if (user.password !== data.password) {
      throw { message: "Incorrect Password" };
    }

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
