import { Footer } from "@/components/footer/footer";
import Logo from "@/components/logo/logo";
import React from "react";

export default function AuthLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="grid min-h-svh relative">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <header className="flex justify-center gap-2">
          <Logo />
        </header>
        <main className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">{children}</div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
