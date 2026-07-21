import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/expertise")({
  beforeLoad: () => {
    throw redirect({ to: "/about" });
  },
});
