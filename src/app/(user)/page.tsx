import { Section } from "@/components/section/section";
import { PageHeading, PageSubTitle } from "@/components/typography/heading";
import { Button } from "@/components/ui/button";
import { getResults } from "@/feature/home/actions/result";
import CardSection from "@/feature/home/components/card-section";
import { verifyAutuser } from "@/lib/dal";
import { AuthUser } from "@/types/auth-user";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import db from "../../../db/db";
import { format } from "date-fns";

export default async function UserHomePage() {
  const authUser = await verifyAutuser();
  if (!authUser) redirect("/login");

  return (
    <>
      <HeaderContainer />
      <CardContainer user={authUser} />
    </>
  );
}

const HeaderContainer = async () => {
  const quiz = await db.quiz_group.findFirst();

  return (
    <Section>
      {/* title */}
      <PageHeading className="text-balance text-primary">
        Challenge your <br /> knowledge
      </PageHeading>

      {quiz && (
        <div className="flex justify-between items-center gap-3 flex-wrap my-4">
          <PageSubTitle className="text-sm">
            Quiz starts at <strong>{format(quiz?.start, "LLL dd, yyyy - h:mm aaa")}</strong>
          </PageSubTitle>

          {quiz.start < new Date() && (
            <Button asChild className="rounded-full">
              <Link href={"/quiz"}>Participate</Link>
            </Button>
          )}
        </div>
      )}
    </Section>
  );
};

const CardContainer = async ({ user }: { user: AuthUser }) => {
  const resultUser = await getResults({
    page: 1,
    size: 1,
    search: user?.mobile,
  });

  return <CardSection result={resultUser} />;
};
