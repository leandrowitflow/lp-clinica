import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

type Props = {
  children: ReactNode;
};

export const metadata: Metadata = {
  icons: { icon: "/L_02.png", apple: "/L_02.png" },
};

export default function RootLayout({ children }: Props) {
  return children;
}
