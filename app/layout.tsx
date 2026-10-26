import type { ReactNode } from "react";
import "./globals.css";

type Props = {
  children: ReactNode;
};

/** Root shell — html/body live in `app/[locale]/layout.tsx`. */
export default function RootLayout({ children }: Props) {
  return children;
}
