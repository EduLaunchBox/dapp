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

export default function SideNav() {
  const { isMenuOpen } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();

  const handleToggleMenu = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    dispatch(toggleMenu());
  };

  const Logo = () => {
    return (
      <Link
        href={"/"}
        className="flex border-2 border-primary/100 px-2 py-2 bg-primary/50 rounded-lg"
      >
        <Image className="" src={EdulaunchLogo} alt="Edulaunch" />
      </Link>
    );
  };

  const NavItem = ({
    href,
    text,
    logo,
  }: {
    href: string;
    text: string;
    logo: any;
  }) => {
    const pathname = usePathname();
    const active = useMemo(() => {
      return pathname === href;
    }, [href, pathname]);

    return (
      <Link
        href={href}
        className={
          (active ? "bg-primary/50 " : "") + "flex w-full p-2 rounded-lg gap-2"
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
            "flex capitalize text-[1.2rem] "
          }
        >
          {text}
        </span>
      </Link>
    );
  };

  return (
    <section
      className={(isMenuOpen ? " flex " : " hidden  ") + " min-h-screen"}
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
          className="absolute right-[-1rem] top-[3.5rem] flex justify-center max-w-fit max-h-fit p-2 rounded-full bg-grey/50 border border-primary/100"
        >
          <IoIosArrowBack size={"1.2rem"} color="#ADADAD" />
        </button>

        {/* Navlinks */}
        <div className="flex h-full flex-col gap-2">
          <NavItem href="/" text="tokens" logo={CoinsSvg} />
          <NavItem href="/liquidity" text="liquidity" logo={DropSvg} />
          <NavItem href="/leaderboard" text="leaderboard" logo={StarSvg} />
          <NavItem href="/airdrop" text="airdrop" logo={CoinSvg} />
          <NavItem href="/dev" text="dev" logo={CodeSvg} />
        </div>

        {/* Footer Card */}
        <div className="flex flex-col w-full bg-primary/500 text-grey/50 rounded-2xl p-4 gap-4">
          <span className="flex font-bold">Connect with us</span>
          <span className="flex w-[12rem] text-[0.875rem] text-pretty">
            Engage with us to become a part of our community and partner with us
          </span>
          <div className="flex gap-6">
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
    </section>
  );
}
