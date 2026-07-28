import type { Metadata } from "next";
import { WorkPage } from "@/views/WorkPage";

export const metadata: Metadata = {
  title: "Work",
  description:
    "A few things we've built. Selected case studies from Kbell & Postman, a digital product studio in Amsterdam.",
  openGraph: {
    title: "Work — KB+PM",
    description: "A few things we've built.",
  },
};

export default function Page() {
  return <WorkPage />;
}
