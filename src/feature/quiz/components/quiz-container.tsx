"use client";

import { Form } from "@/components/forms/form";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import React, { useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "@bprogress/next";
import { CircleCheckBig } from "lucide-react";
import { quiz, quiz_submit } from "@prisma/client";
import { submitQuizzes } from "../actions/quiz";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function QuizContainer({
  question,
  submissions,
  user_id,
}: {
  question: { data: quiz[]; count: number } | null;
  submissions: { data: quiz_submit[]; count: number } | null;
  user_id?: string;
}) {
  const [submitCount, setSubmitCount] = React.useState(submissions?.count ?? 0);
  const [checkedValue, setCheckedValue] = React.useState<string | undefined>(
    submissions?.data?.[0]?.answer ?? undefined
  );
  const [submitResponse, setSubmitResponse] = React.useState<
    Partial<quiz_submit>[]
  >([]);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const currentQuestion = question?.data?.[submitCount];

  const handleNext = () => {
    if (!currentQuestion || checkedValue === undefined) return;

    setSubmitResponse((prev) => [
      ...prev,
      {
        user_id,
        question_id: currentQuestion.id,
        answer: checkedValue,
        group_id: currentQuestion.group_id,
        correct_answer: currentQuestion.answer,
      },
    ]);

    setSubmitCount((prev) => prev + 1);
    setCheckedValue(undefined);
  };

  const handleSubmit = () => {
    startTransition(async () => {
      const response = await submitQuizzes(submitResponse);
      if (response.success) {
        toast.success(response.success);
        router.push("/preview");
      } else if (response.toast) {
        toast.error(response.toast);
      }
    });
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div>
        <h3 className="text-xs font-medium">Questions</h3>
        <p className="text-2xl font-semibold text-primary">
          <span className="text-secondary-foreground">{submitCount}</span>/
          {question?.count}
        </p>
        <Progress
          className="mt-3"
          value={(submitCount * 100) / (question?.count ?? 1)}
        />
      </div>

      {/* Question Form */}
      <Form className="mt-6">
        {currentQuestion ? (
          <>
            <p className=" font-semibold rounded-md bg-secondary/50 min-h-20 p-4 text-foreground border border-secondary-foreground/35 relative">
              <span className="text-primary">Q{submitCount + 1}.</span>{" "}
              <span>{currentQuestion?.question}</span>
            </p>

            {currentQuestion.option_1 && currentQuestion.option_1 != "NULL" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {currentQuestion.option_1 && (
                  <CustomButton
                    data-selected={checkedValue === currentQuestion.option_1}
                    type="button"
                    onClick={() =>
                      setCheckedValue(currentQuestion.option_1 ?? "")
                    }
                  >
                    {currentQuestion.option_1}
                  </CustomButton>
                )}
                {currentQuestion.option_2 && (
                  <CustomButton
                    data-selected={checkedValue === currentQuestion.option_2}
                    type="button"
                    onClick={() =>
                      setCheckedValue(currentQuestion.option_2 ?? "")
                    }
                  >
                    {currentQuestion.option_2}
                  </CustomButton>
                )}
                {currentQuestion.option_3 && (
                  <CustomButton
                    data-selected={checkedValue === currentQuestion.option_3}
                    type="button"
                    onClick={() =>
                      setCheckedValue(currentQuestion.option_3 ?? "")
                    }
                  >
                    {currentQuestion.option_3}
                  </CustomButton>
                )}
                {currentQuestion.option_4 && (
                  <CustomButton
                    data-selected={checkedValue === currentQuestion.option_4}
                    type="button"
                    onClick={() =>
                      setCheckedValue(currentQuestion.option_4 ?? "")
                    }
                  >
                    {currentQuestion.option_4}
                  </CustomButton>
                )}
              </div>
            ) : (
              <div className="grid gap-2">
                <Label>Answer</Label>
                <Input
                  placeholder="enter your answer"
                  value={checkedValue}
                  onChange={(e) => setCheckedValue(e.target.value)}
                />
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col justify-center items-center gap-3 my-6">
            <CircleCheckBig className="size-20 text-primary" />{" "}
            <p className="text-sm">Submit your response.</p>
          </div>
        )}

        {(question?.count ?? 0) > submitCount ? (
          <Button
            type="button"
            className="mt-4 w-fit min-w-[10rem] mx-auto mb-10"
            onClick={handleNext}
            disabled={checkedValue === undefined}
          >
            Next
          </Button>
        ) : (
          <Button
            type="button"
            className="w-fit min-w-[10rem] mx-auto flex items-center"
            onClick={handleSubmit}
            disabled={isPending || question?.count === submissions?.count}
          >
            {isPending ? "Submitting..." : "Submit"}
          </Button>
        )}
      </Form>
    </div>
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
        "bg-background h-fit text-wrap whitespace-normal text-primary flex items-center text-left justify-start gap-6 border hover:border-primary hover:bg-primary data-[selected=true]:bg-primary data-[selected=true]:text-primary-foreground",
        className
      )}
      {...props}
    />
  );
};
