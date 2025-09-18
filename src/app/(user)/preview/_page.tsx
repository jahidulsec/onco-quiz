import React from "react";

import { verifyAutuser } from "@/lib/dal";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { NoData } from "@/components/state/state";
import { Section, StateSection } from "@/components/section/section";
import { getQuizSubmitWithQuestion } from "@/feature/quiz/servers/quiz";
import { Prisma } from "@prisma/client";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

export default async function PreviewPage() {
  const authUser = await verifyAutuser();
  const response = await getQuizSubmitWithQuestion(authUser?.id ?? "");

  let totalMark = 0;

  for (let i = 0; i < (response?.count ?? 0); i++) {
    totalMark += Number(response?.data?.[i].mark ?? 0);
  }

  if ((response?.count ?? 0) === 0)
    return (
      <StateSection>
        <NoData />
        <Button asChild className="min-w-[10rem]">
          <Link href={"/"}> Go Back</Link>
        </Button>
      </StateSection>
    );

  return (
    <Section className="flex flex-col gap-6">
      <div className="flex items-center gap-3 bg-background overflow-hidden w-fit px-2 py-1 rounded-md text-primary ml-auto border border-secondary/50 text-xs">
        <p>Correct Answers</p>
        <p className="font-semibold bg-secondary px-4 py-0.5 rounded-md text-foreground">
          {totalMark} / {10}{" "}
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {response?.data &&
          response.data.map(
            (
              item: Prisma.quiz_submitGetPayload<{ include: { quiz: true } }>,
              index
            ) => (
              <article
                key={item.id}
                className="border p-4 rounded-md bg-background/85 backdrop-blur-lg"
              >
                <p className="mb-4">
                  <span className="text-primary rounded-full">
                    Q{index + 1}.
                  </span>{" "}
                  {item.quiz.question}
                </p>
                <div className="grid grid-cols-1 gap-4">
                  {item.quiz.option_1 && item.quiz.option_1 != "NULL" ? (
                    <div className="grid grid-cols-1 gap-5">
                      {item.quiz.option_1 && (
                        <CustomButton
                          data-correct={item.mark === 1}
                          data-selected={
                            item.answer.toLowerCase() ===
                            item.quiz.option_1.toLowerCase()
                          }
                          type="button"
                        >
                          {item.quiz.option_1}
                        </CustomButton>
                      )}
                      {item.quiz.option_2 && (
                        <CustomButton
                          data-correct={item.mark === 1}
                          data-selected={
                            item.answer.toLowerCase() ===
                            item.quiz.option_2.toLowerCase()
                          }
                          type="button"
                        >
                          {item.quiz.option_2}
                        </CustomButton>
                      )}
                      {item.quiz.option_3 && (
                        <CustomButton
                          data-correct={item.mark === 1}
                          data-selected={
                            item.answer.toLowerCase() ===
                            item.quiz.option_3.toLowerCase()
                          }
                          type="button"
                        >
                          {item.quiz.option_3}
                        </CustomButton>
                      )}
                      {item.quiz.option_4 && (
                        <CustomButton
                          data-correct={item.mark === 1}
                          data-selected={
                            item.answer.toLowerCase() ===
                            item.quiz.option_4.toLowerCase()
                          }
                          type="button"
                        >
                          {item.quiz.option_4}
                        </CustomButton>
                      )}
                    </div>
                  ) : (
                    <div className="grid gap-2">
                      <Label className="text-sm font-semibold">Your Answer</Label>
                      <Input
                        className={item.mark === 0 ? "text-destructive bg-destructive/5" : 'text-primary bg-secondary'}
                        placeholder="enter your answer"
                        value={item.answer}
                      />
                    </div>
                  )}

                  <div className="bg-secondary/20 border border-secondary p-4 rounded-md">
                    <p className="text-sm font-semibold">Correct Answer</p>
                    <p className="text-primary font-black">{item.quiz.answer}</p>
                  </div>
                </div>
              </article>
            )
          )}
      </div>

      <Button className="w-fit min-w-[10rem] mx-auto mt-16 mb-10" asChild>
        <Link href={"/"}>Go back to home</Link>
      </Button>
    </Section>
  );
}

const CustomButton = ({
  className,
  ...props
}: React.ComponentProps<"button">) => {
  return (
    <Button
      type="button"
      className={cn(
        "bg-background h-fit text-wrap whitespace-normal text-primary flex items-center text-left justify-start gap-6 border hover:border-primary hover:bg-primary-foreground [[data-selected=true][data-correct=true]]:bg-secondary [[data-selected=true][data-correct=false]]:bg-destructive/5 [[data-selected=true][data-correct=false]]:text-destructive",
        className
      )}
      {...props}
    />
  );
};
