import "./globals.css";
import type { Metadata } from "next";
import App from "./App";
import { WagProvider } from "./providers/wagmi";
import { headers } from "next/headers";

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
  const cookie = headers().get("cookie");
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <WagProvider cookie={cookie}>
          <App>{children}</App>
        </WagProvider>
      </body>
    </html>
  );
}
