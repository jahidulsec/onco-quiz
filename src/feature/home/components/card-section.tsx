import { Section } from "@/components/section/section";
import { Button } from "@/components/ui/button";
import { timeConversion } from "@/lib/formatter";
import { cn } from "@/lib/utils";
import {
  ArrowUpRight,
  BookCopy,
  GraduationCap,
  LucideIcon,
} from "lucide-react";
import Link from "next/link";
import React from "react";

export default function CardSection({ result }: { result: any }) {
  return (
    <Section className="grid grid-cols-2 gap-1">
      <Card
        item={{
          title: "Rank",
          icon: GraduationCap,
          value: (
            <p className="text-2xl font-semibold">
              {Number(result.data?.[0]?.rank)}
            </p>
          ),
        }}
      />

      <Card
        item={{
          title: "Questions",
          icon: BookCopy,
          value: (
            <p>
              <strong className="text-2xl">
                {Number(result.data?.[0]?.total_mark) * 5}
              </strong>{" "}
              <span>/ 50</span>
            </p>
          ),
        }}
      />

      <div
        className={cn(
          "rounded-xl bg-foreground p-4 flex flex-col justify-center gap-4 col-span-2 border border-primary/50"
        )}
      >
        <h3 className="font-semibold text-secondary">Overview</h3>
        <div className="grid grid-cols-[0.75fr_1fr] items-center gap-1 text-background">
          <p>
            <strong className="text-2xl">
              {Number(result.data?.[0]?.total_mark)}
            </strong>{" "}
            / 10
          </p>
          <p className="text-sm text-right font-medium">Correct Answer</p>
          <strong>
            {timeConversion(Number(result.data?.[0]?.total_duration) * 1000)}
          </strong>
          <p className="text-sm text-right font-medium">Overall time spent</p>
        </div>
      </div>

      <Button size={"lg"} className="rounded-xl col-span-2" asChild>
        <Link href={`/leaderboard`}>
          Leaderboard <ArrowUpRight />
        </Link>
      </Button>
    </Section>
  );
}

const Card = ({
  item,
  className,
}: {
  item: {
    icon?: LucideIcon;
    title?: string;
    value: React.ReactNode;
  };
} & React.ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "rounded-xl bg-secondary p-4 flex flex-col justify-center items-center gap-4",
        className
      )}
    >
      {item.icon && <item.icon className="text-primary size-6" />}
      <div className="flex items-center flex-col">
        {item.value}
        {item.title && <p>{item.title}</p>}
      </div>
    </div>
  );
};
