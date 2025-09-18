import React from "react";
import NavUser from "./nav-user";
import Logo from "../logo/logo";
import { verifyAutuser } from "@/lib/dal";
import { redirect } from "next/navigation";

export default async function UserAppNav() {
  const user = await verifyAutuser();

  if (!user) redirect("/login");

  return (
    <header className="px-6 py-4 flex justify-between items-center gap-5">
      {/* left */}
      <Logo className="flex-row [&_h4]:max-w-10 leading-4" />

      {/* right */}
      <NavUser user={user} />
    </header>
  );
}
