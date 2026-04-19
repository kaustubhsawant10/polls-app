"use client";

import { SCHEDULE, IplMatch } from "@/public/schedule";
import VotingCard from "@/src/components/VotingCard";

export default function Poll() {
  const matches = JSON.parse(JSON.stringify(SCHEDULE)) as IplMatch[];

  return (
    <div className="p-4 grid gap-5 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
      {matches.map((match) => (
        <VotingCard key={match.id} match={match}></VotingCard>
      ))}
    </div>
  );
}
