import { cn } from "@/lib/utils";
import React from "react";

const Section = ({ className, ...props }: React.ComponentProps<"section">) => {
  return <section {...props} className={cn("px-6", className)} />;
};

export { Section };
