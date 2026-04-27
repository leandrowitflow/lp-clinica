import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

const logoIcon = "/L_02.png";

export const metadata: Metadata = {
  icons: {
    icon: [{ url: logoIcon, type: "image/png" }],
    apple: [{ url: logoIcon, type: "image/png" }],
  },
};

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return children;
}
