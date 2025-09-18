import { verifyAutuser } from "@/lib/dal";
import React from "react";
import NavUser from "./nav-user";
import { redirect } from "next/navigation";

export default async function UserAppNav() {
  const user = await verifyAutuser();

  if (!user) redirect("/login");

  return (
    <header className="px-6 py-2 flex justify-between items-center gap-5">
      {/* left */}
      <div className="flex flex-col">
        <p className="text-xs">Hello</p>
        <h3 className="font-semibold">{user?.name}</h3>
      </div>

      {/* right */}
      <NavUser user={user} />
    </header>
  );
}
