import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/playground")({
  component: PlaygroundLayout,
});

function PlaygroundLayout() {
  return <Outlet />;
}
