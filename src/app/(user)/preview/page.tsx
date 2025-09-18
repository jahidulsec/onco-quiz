import React from "react";

import { verifyAutuser } from "@/lib/dal";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { NoData } from "@/components/state/state";
import { Section, StateSection } from "@/components/section/section";
import { getQuizSubmitWithQuestion } from "@/feature/quiz/servers/quiz";

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
    <Section className="flex flex-col justify-center items-center gap-6">
      <article className="flex flex-col justify-center items-center gap-6 min-h-[50vh]">
        <p className="text-center text-lg text-balance">
          Thank You for Participating in <strong>Onco Mastermind!</strong>
        </p>
        <p className="text-center bg-secondary min-w-[18rem] p-3 rounded-md">
          Your Score <br />{" "}
          <span className="text-xl font-semibold text-primary">
            {totalMark * 5}
          </span>{" "}
          / {10 * 5}{" "}
        </p>
        <p className="text-center text-balance text-sm">
          We appreciate your engagement and look forward to seeing you at the
          booth again.
        </p>
      </article>

      <Button className="w-fit min-w-[10rem] mx-auto mt-16 mb-10" asChild>
        <Link href={"/"}>Go back to home</Link>
      </Button>
    </Section>
  );
}
