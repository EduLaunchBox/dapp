import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "./sections/navbar";
import SideNav from "./sections/sidenav";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={"font-cabinet_grotesk text-grey/700 flex w-full h-full"}>
        <SideNav />
        <div className="flex flex-col w-full bg-primary/50">
          <NavBar />
          <div>{children}</div>
        </div>
      </body>
    </html>
  );
}
