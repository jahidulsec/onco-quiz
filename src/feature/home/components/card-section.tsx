import { Section } from "@/components/section/section";
import { cn } from "@/lib/utils";
import { BookCopy, GraduationCap, LucideIcon } from "lucide-react";
import React from "react";

export default function CardSection() {
  return (
    <Section className="grid grid-cols-2 gap-1">
      <Card
        item={{
          title: "Rank",
          icon: BookCopy,
          value: <p className="text-2xl font-semibold">3</p>,
        }}
      />

      <Card
        item={{
          title: "Questions",
          icon: GraduationCap,
          value: (
            <p>
              <strong className="text-2xl">3</strong> <span>/ 5</span>
            </p>
          ),
        }}
      />

      <div
        className={cn(
          "rounded-xl bg-muted/75 p-4 flex flex-col justify-center gap-4 col-span-2 border border-primary/50"
        )}
      >
        <h3 className="font-semibold text-primary">Overview</h3>
      </div>
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
