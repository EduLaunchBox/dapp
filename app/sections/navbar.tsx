"use client";
import { usePathname } from "next/navigation";
import { Button } from "../components/buttons";
import { useMemo } from "react";
import MiniLogo from "../assets/images/miniLogo.png";
import Image from "next/image";
import { IoIosArrowBack } from "react-icons/io";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { toggleMenu } from "../store/slice/appSlice";

export default function NavBar() {
  const pathname = usePathname();
  const { isMenuOpen } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();

  const handleToggleMenu = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    dispatch(toggleMenu());
  };

  const pathextract = useMemo(() => {
    return pathname.split("/").map((str) => str.split("-").join(" "));
  }, [pathname]);

  return (
    <nav className="flex w-full justify-between bg-transparent max-lg:pl-0 max-lg:py-0 max-xs:pr-4 max-sm:pr-6 max-md:pr-8 max-lg:pr-10 px-10 py-4">
      <div className="flex gap-2">
        {/* Closed menu */}
        <div
          className={
            (isMenuOpen ? " hidden " : " flex ") +
            " p-[0.05rem] bg-grey/50 rounded-br-2xl"
          }
        >
          <div className="relative flex flex-col px-3 py-2 justify-between gap-8 border-r-2 border-b-2 rounded-br-2xl border-primary/100 m-[0.15rem] bg-grey/50">
            <Image className="w-10 h-10" src={MiniLogo} alt="Edulaunchbox" />

            <button
              onClick={handleToggleMenu}
              className="absolute right-[1.2rem] top-[2.65rem] flex justify-center max-w-fit max-h-fit p-1 rounded-full bg-grey/50 border border-primary/100"
            >
              <IoIosArrowBack size={"1rem"} color="#ADADAD" />
            </button>
          </div>
        </div>
        <span className="text-primary/300 font-medium my-auto capitalize">
          {pathname === "/" ? "Tokens" : pathextract}
        </span>
      </div>
      <div className="flex max-sm:w-28 w-36 my-auto">
        <Button text="Connect Wallet" color="green" />
      </div>
    </nav>
  );
}
