import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import React from "react";

const PageLoading = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "min-h-[20rem] flex flex-col justify-center items-center",
        className
      )}
      {...props}
    >
      <Loader2 size={50} className="text-primary animate-spin" />
    </div>
  );
};

export { PageLoading };
