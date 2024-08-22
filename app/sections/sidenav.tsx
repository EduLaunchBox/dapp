"use client";
import Image from "next/image";
import EdulaunchLogo from "../assets/images/logo.svg";
import Link from "next/link";
import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { BsDiscord, BsTelegram, BsTwitterX } from "react-icons/bs";
import CoinsSvg from "../assets/images/coins";
import DropSvg from "../assets/images/drop";
import StarSvg from "../assets/images/star";
import CoinSvg from "../assets/images/coin";
import { CodeSvg } from "../assets/images/code";
import { IoIosArrowBack } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { toggleMenu } from "../store/slice/appSlice";
import TokenSplitting from "./popovers/tokenSplitting";

export default function SideNav() {
  const { isMenuOpen } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();

  const handleToggleMenu = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    dispatch(toggleMenu());
  };
  const pathname = usePathname();

  const Logo = () => {
    return (
      <Link
        href={"/"}
        className="flex max-md:w-fit border-2 border-primary/100 px-2 py-2 bg-primary/50 rounded-lg"
      >
        <Image
          className="max-md:w-[10rem]"
          src={EdulaunchLogo}
          alt="Edulaunch"
        />
      </Link>
    );
  };

  const NavItem = ({
    href,
    text,
    logo,
    active,
  }: {
    href: string;
    text: string;
    active: boolean;
    logo: any;
  }) => {
    return (
      <Link
        href={href}
        className={
          (active ? "bg-primary/50 " : "") + " flex w-full p-2 rounded-lg gap-2"
        }
      >
        <span>
          {logo({
            className: active ? "stroke-primary/500" : "stroke-grey/700",
            color: "",
          })}
        </span>
        <span
          className={
            (active ? "text-primary/500 font-bold " : "") +
            "flex capitalize max-md:text-[1rem] text-[1.2rem] "
          }
        >
          {text}
        </span>
      </Link>
    );
  };

  return (
    <section
      className={
        (isMenuOpen ? " flex  " : " max-lg:hidden flex") +
        " max-lg:fixed max-lg:left-0 max-lg:top-0 max-lg:z-50 max-lg:bg-grey/50 max-h-screen min-h-screen"
      }
    >
      {/* Opened Menu */}
      <div className="relative flex flex-col px-3 py-2 justify-between gap-8 border-r-2 border-primary/100 m-[0.15rem]">
        {/* Logo */}
        <div>
          <Logo />
        </div>

        {/* Collapse */}
        <button
          onClick={handleToggleMenu}
          className="hidden max-lg:flex absolute right-[-1rem] top-[3.5rem] justify-center max-w-fit max-h-fit p-2 rounded-full bg-grey/50 border border-primary/100"
        >
          <IoIosArrowBack size={"1.2rem"} color="#ADADAD" />
        </button>

        {/* Navlinks */}
        <div className="flex h-full flex-col gap-2">
          <NavItem
            active={pathname === "/" || pathname.includes("-tokens")}
            href="/"
            text="tokens"
            logo={CoinsSvg}
          />
          <NavItem
            active={pathname.includes("/liquidity")}
            href="/liquidity"
            text="liquidity"
            logo={DropSvg}
          />
          <NavItem
            active={pathname.includes("/leaderboard")}
            href="/leaderboard"
            text="leaderboard"
            logo={StarSvg}
          />
          <NavItem
            active={pathname.includes("/airdrop")}
            href="/airdrop"
            text="airdrop"
            logo={CoinSvg}
          />
          <NavItem
            active={pathname.includes("/dev")}
            href="https://pauloladimeji.notion.site/EduLaunchBox-Docs-b887dad6ef0e4fa185d6f799a2e77001?pvs=4"
            text="dev"
            logo={CodeSvg}
          />
        </div>

        {/* Footer Card */}
        <div className="flex flex-col w-full bg-primary/500 text-grey/50 rounded-2xl p-4 max-md:gap-2 gap-4">
          <span className="flex max-md:text-[0.875rem] font-bold">
            Connect with us
          </span>
          <span className="flex max-md:w-[9rem] w-[12rem] max-md:text-[0.75rem] text-[0.875rem] text-pretty">
            Engage with us to become a part of our community and partner with us
          </span>
          <div className="flex max-md:gap-4 gap-6">
            <Link href={"https://twitter.com/EduLaunchBox"}>
              <BsTwitterX size={"1.5rem"} />
            </Link>
            <Link href={""}>
              <BsDiscord size={"1.5rem"} />
            </Link>

            <Link href={""}>
              <BsTelegram size={"1.5rem"} />
            </Link>
          </div>
        </div>
      </div>
      {/* <TokenSplitting /> */}
    </section>
  );
}
