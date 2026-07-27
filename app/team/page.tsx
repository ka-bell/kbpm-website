import type { Metadata } from "next";
import { TeamPage } from "@/views/TeamPage";

export const metadata: Metadata = {
  title: "Team",
  description:
    "The people behind kbell + postman. A senior-led studio in Amsterdam — specialists when the brief needs them.",
  openGraph: {
    title: "Team — kbell + postman",
    description: "Senior-led studio. Specialists when needed.",
  },
};

export default function Page() {
  return <TeamPage />;
}
