import { Section } from "@/components/section/section";
import { PageHeading, PageSubTitle } from "@/components/typography/heading";
import { Button } from "@/components/ui/button";
import CardSection from "@/feature/home/components/card-section";
import React from "react";

export default function UserHomePage() {
  return (
    <>
      <Section>
        <PageHeading className="text-balance text-primary">
          Challenge your <br /> knowledge
        </PageHeading>

        <div className="flex justify-between items-center gap-3 flex-wrap">
          <PageSubTitle>Quiz starts at 11:00 PM</PageSubTitle>
          <Button>Participates</Button>
        </div>
      </Section>
      <CardContainer />
    </>
  );
}

const CardContainer = async () => {
  return <CardSection />;
};
