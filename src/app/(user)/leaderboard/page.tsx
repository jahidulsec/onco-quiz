import { Section } from "@/components/section/section";
import LeaderboardSection from "@/feature/leaderboard/components/leaderboard-section";
import { getLeaderboard } from "@/feature/leaderboard/servers/leaderboard";
import { verifyAutuser } from "@/lib/dal";
import React from "react";

export default async function LeaderboardPage() {
  const authUser = await verifyAutuser();

  const SIZE = 20;

  const res = await getLeaderboard({ page: "1", size: SIZE });
  const userData = await getLeaderboard({
    page: "1",
    size: 1,
    search: authUser?.mobile,
  });

  return (
    <Section className="flex flex-col gap-6">
      <div className="flex items-start gap-3">
        <div className="flex flex-col items-start gap-0">
          <h1 className="text-xl font-semibold text-primary">Leaderboard</h1>
          <p className="text-xs text-muted-foreground font-semibold">
            Top {SIZE}
          </p>
        </div>
      </div>
      <LeaderboardSection data={res.data} userData={userData.data} />
    </Section>
  );
}
