import { Section } from "@/components/section/section";
import { PageHeading, PageSubTitle } from "@/components/typography/heading";
import { Button } from "@/components/ui/button";
import CardSection from "@/feature/home/components/card-section";
import Link from "next/link";
import React from "react";

export default async function UserHomePage() {


  return (
    <>
      <HeaderContainer />
      <CardContainer />
    </>
  );
}

const HeaderContainer = async () => {
  return (
    <Section>
      {/* title */}
      <PageHeading className="text-balance text-primary">
        Challenge your <br /> knowledge
      </PageHeading>

      <div className="flex justify-between items-center gap-3 flex-wrap">
        <PageSubTitle>Quiz starts at 11:00 PM</PageSubTitle>
        <Button size={"sm"} asChild>
          <Link href={"/quiz"}>Participates</Link>
        </Button>
      </div>
    </Section>
  );
};

const CardContainer = async () => {
  return <CardSection />;
};
