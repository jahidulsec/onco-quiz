"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import {
  PageHeading,
  PageSubTitle,
} from "../../../components/typography/heading";
import { Form, FormButton, FormItem } from "../../../components/forms/form";
import { PasswordInput } from "../../../components/input/password";
import { signUpUser } from "../actions/auth";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "@bprogress/next/app";
import { ErrorMessage } from "@/components/text/error-message";

export function SignUpForm() {
  const [data, action, pending] = useActionState(signUpUser, null);
  const router = useRouter();

  useEffect(() => {
    if (data?.toast) {
      toast.error(data.toast);
    } else if (data?.success) {
      toast.success(data.success);
      router.push("/");
    }
  }, [data]);

  return (
    <Form action={action}>
      <div className="flex flex-col items-center gap-2 text-center">
        <PageHeading className="text-primary">Sign Up</PageHeading>
        <PageSubTitle>Create your account</PageSubTitle>
      </div>
      <div className="grid gap-6">
        <FormItem>
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="m@example.com"
            defaultValue={data?.values?.name?.toString() ?? undefined}
          />
          {data?.error && <ErrorMessage message={data.error.name ?? ""} />}
        </FormItem>
        <FormItem>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="m@example.com"
            defaultValue={data?.values?.email?.toString() ?? undefined}
          />
          {data?.error && <ErrorMessage message={data.error.email ?? ""} />}
        </FormItem>
        <FormItem>
          <Label htmlFor="mobile">Mobile</Label>
          <Input
            id="mobile"
            name="mobile"
            placeholder="01XXX XXX XXX"
            defaultValue={data?.values?.mobile?.toString() ?? undefined}
          />
          {data?.error && <ErrorMessage message={data.error.mobile ?? ""} />}
        </FormItem>
        <FormItem>
          <Label htmlFor="institute">Institute</Label>
          <Input
            id="institute"
            name="institute"
            defaultValue={data?.values?.institute?.toString() ?? undefined}
          />
          {data?.error && <ErrorMessage message={data.error.institute ?? ""} />}
        </FormItem>
        <FormItem className="grid gap-3">
          <Label htmlFor="password">Password</Label>
          <PasswordInput
            id="password"
            placeholder="password"
            type="password"
            name="password"
            defaultValue={data?.values?.password?.toString() ?? undefined}
          />
          {data?.error && <ErrorMessage message={data.error.password ?? ""} />}
        </FormItem>
        <FormButton pending={pending}>Create account</FormButton>
      </div>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link href="/login" className="underline underline-offset-4">
          Login
        </Link>
      </div>
    </Form>
  );
}
