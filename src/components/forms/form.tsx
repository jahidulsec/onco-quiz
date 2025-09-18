import { cn } from "@/lib/utils";
import React from "react";
import { Button, ButtonProps } from "../ui/button";
import { Loader } from "lucide-react";

const Form = ({ className, ...props }: React.ComponentProps<"form">) => {
  return <form className={cn("flex flex-col gap-6", className)} {...props} />;
};

const FormItem = ({ className, ...props }: React.ComponentProps<"div">) => {
  return <div className={cn("flex flex-col gap-3", className)} {...props} />;
};

const FormButton = ({
  className,
  disabled,
  pending,
  children,
  ...props
}: ButtonProps & { pending?: boolean }) => {
  return (
    <Button
      {...props}
      className={cn("w-full", className)}
      disabled={pending || disabled}
    >
      {pending && <Loader className="animate-spin" />}
      {children}
    </Button>
  );
};

export { Form, FormItem, FormButton };
