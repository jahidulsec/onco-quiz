import { cn } from "@/lib/utils";
import { Folder, MessageCircleOff } from "lucide-react";
import React from "react";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

const NoData = () => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Folder />
        </EmptyMedia>
        <EmptyTitle>No Quiz Yet</EmptyTitle>
        <EmptyDescription>
          Currently, quiz data is not found for this time. Please try again
          later.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
};

const NoQuizData = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-1 text-secondary/50 pointer-events-none min-h-50 justify-center items-center",
        className
      )}
      {...props}
    >
      <MessageCircleOff size={50} />
      <p className="text-xs font-medium mt-3">Pl</p>
    </div>
  );
};

export { NoData, NoQuizData };
