import { cn } from "@/lib/utils";
import React from "react";

const PageHeading = ({ className, ...props }: React.ComponentProps<"h1">) => {
  return (
    <h1
      className={cn("text-2xl font-bold", className)}
      {...props}
    />
  );
};

const PageSubTitle = ({ className, ...props }: React.ComponentProps<"p">) => {
  return (
    <p
      className={cn("text-muted-foreground text-xs text-balance font-medium font-urbanist tracking-wider", className)}
      {...props}
    />
  );
};

export { PageHeading, PageSubTitle };
