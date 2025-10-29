import { cn } from "@/lib/utils";
import { Brain } from "lucide-react";
import React from "react";

export default function Logo({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex flex-col items-center gap-2 font-medium", className)}
      {...props}
    >
      <div className="bg-secondary text-secondary-foreground flex size-8 items-center justify-center rounded-md">
        <Brain className="size-6" />
      </div>
      <h4>Onco MindMaster</h4>
    </div>
  );
}
