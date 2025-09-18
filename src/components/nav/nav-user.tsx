"use client";

import React, { useTransition } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AuthUser } from "@/types/auth-user";
import { useRouter } from "@bprogress/next/app";
import { toast } from "sonner";
import { logout } from "@/feature/auth/actions/auth";

export default function NavUser({ user }: { user: AuthUser }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="p-1 bg-muted/75">
          <AvatarImage src="/images/user.png" />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* <DropdownMenuItem>Profile</DropdownMenuItem> */}
        <DropdownMenuItem
          disabled={isPending}
          onClick={() => {
            startTransition(async () => {
              const response = logout();
              toast.promise(response, {
                loading: "Loading...",
                success: (data) => {
                  if (!data.success) throw data.error;
                  router.replace("/login");
                  return data.success;
                },
                error: (data) => {
                  return data.error;
                },
              });
            });
          }}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
