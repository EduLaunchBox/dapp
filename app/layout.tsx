import "./globals.css";
import type { Metadata } from "next";
import App from "./App";

export const metadata: Metadata = {
  title: {
    template: "EduLaunchBox - %s",
    default: "EduLaunchBox",
  },
  description:
    "Create new tokens, migrate existing tokens and token holders from other EVM chains, and instantly deploy liquidity on EDUCHAIN.",
  openGraph: {
    siteName: "EduLaunchBox",
    url: "https://www.edulaunchbox.app",
    images: [
      {
        url: "https://www.edulaunchbox.app/og.png",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <App>{children}</App>
    </html>
  );
}
