import React from "react";

export default function UserLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="mx-auto container max-w-md border-x min-h-svh relative px-6">
      <main className="flex flex-col gap-6">{children}</main>
    </div>
  );
}
