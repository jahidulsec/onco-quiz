"use server";

import db from "../../../../db/db";
import { format } from "date-fns";

export const getQuizzes = async () => {
  const currentDate = new Date();
  const newDate = new Date();
  newDate.setDate(currentDate.getDate() + 1);

  try {
    const [data, count] = await Promise.all([
      db.quiz.findMany({
        where: {
          quiz_group: {
            start: {
              gte: new Date(format(currentDate, "yyyy-MM-dd")),
              lt: new Date(format(newDate, "yyyy-MM-dd")),
            },
          },
        },
      }),
      db.quiz.count({
        where: {
          quiz_group: {
            start: {
              gte: new Date(format(currentDate, "yyyy-MM-dd")),
              lt: new Date(format(newDate, "yyyy-MM-dd")),
            },
          },
        },
      }),
    ]);

    return { data, count };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getQuizzesCount = async () => {
  const currentDate = new Date();
  const newDate = new Date();
  newDate.setDate(currentDate.getDate() + 1);

  try {
    const [count] = await Promise.all([
      db.quiz.count({
        where: {
          quiz_group: {
            start: {
              gte: new Date(format(currentDate, "yyyy-MM-dd")),
              lt: new Date(format(newDate, "yyyy-MM-dd")),
            },
          },
        },
      }),
    ]);

    return count;
  } catch (error) {
    console.error(error);
    return 0;
  }
};

export const getQuiz = async (id: string) => {
  try {
    const data = await db.quiz.findUnique({
      where: {
        id,
      },
    });

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getQuizSubmit = async (userId: string) => {
  const currentDate = new Date();
  const newDate = new Date();
  newDate.setDate(currentDate.getDate() + 1);

  console.log(currentDate);
  console.log(newDate);
  try {
    const [data, count] = await Promise.all([
      db.quiz_submit.findMany({
        where: {
          quiz: {
            quiz_group: {
              start: {
                gte: new Date(format(currentDate, "yyyy-MM-dd")),
                lt: new Date(format(newDate, "yyyy-MM-dd")),
              },
            },
          },
          user_id: userId,
        },
      }),
      db.quiz_submit.count({
        where: {
          quiz: {
            quiz_group: {
              start: {
                gte: new Date(format(currentDate, "yyyy-MM-dd")),
                lt: new Date(format(newDate, "yyyy-MM-dd")),
              },
            },
          },
          user_id: userId,
        },
      }),
    ]);

    return { data, count };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getQuizSubmitWithQuestion = async (userId: string) => {
  const currentDate = new Date();
  const newDate = new Date();
  newDate.setDate(currentDate.getDate() + 1);

  try {
    const [data, count] = await Promise.all([
      db.quiz_submit.findMany({
        where: {
          quiz: {
            quiz_group: {
              start: {
                gte: new Date(format(currentDate, "yyyy-MM-dd")),
                lt: new Date(format(newDate, "yyyy-MM-dd")),
              },
            },
          },
          user_id: userId,
        },
        include: { quiz: true },
      }),
      db.quiz_submit.count({
        where: {
          quiz: {
            quiz_group: {
              start: {
                gte: new Date(format(currentDate, "yyyy-MM-dd")),
                lt: new Date(format(newDate, "yyyy-MM-dd")),
              },
            },
          },
          user_id: userId,
        },
      }),
    ]);

    return { data, count };
  } catch (error) {
    console.error(error);
    return null;
  }
};
