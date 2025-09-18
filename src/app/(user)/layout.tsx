import { Footer } from "@/components/footer/footer";
import UserAppNav from "@/components/nav/user-app-nav";
import React from "react";

export default function UserLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="mx-auto container max-w-md border-x min-h-svh relative">
      <UserAppNav />
      <main className="flex flex-col gap-6 min-h-[calc(100svh-150px)] my-6">
        {children}
      </main>
      <Footer />
    </div>
  );
}
