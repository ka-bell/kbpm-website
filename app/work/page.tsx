import type { Metadata } from "next";
import { WorkPage } from "@/views/WorkPage";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Five builds. Real clients. Real problems solved. Selected case studies from kbell + postman, a digital product studio in Amsterdam.",
  openGraph: {
    title: "Work — kbell + postman",
    description: "Five builds. Real clients. Real problems solved.",
  },
};

export default function Page() {
  return <WorkPage />;
}
