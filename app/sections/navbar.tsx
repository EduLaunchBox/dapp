"use client";
import { usePathname } from "next/navigation";
import { Button } from "../components/buttons";
import { useMemo } from "react";
import MiniLogo from "../assets/images/miniLogo.png";
import Image from "next/image";
import { IoIosArrowBack } from "react-icons/io";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { toggleMenu } from "../store/slice/appSlice";
import Link from "next/link";
import { TiChevronRight } from "react-icons/ti";
import { ConnectWallet } from "../components/shared/ConnectWallet";
import PrimaryButton from "../components/shared/Buttons";

export default function NavBar() {
    const pathname = usePathname();
    const dispatch = useAppDispatch();

    const handleToggleMenu = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        dispatch(toggleMenu());
    };

    const pathextract = useMemo(() => {
        let extract: string[] = pathname.includes("-tokens") ? ["Tokens"] : [];
        extract = [...extract, ...pathname.split("/").map((str) => str.split("-").join(" "))];
        console.log(extract);

        return extract;
    }, [pathname]);

    return (
        <nav className="flex w-full justify-between bg-transparent max-lg:pl-0 max-lg:py-0 max-xs:pr-4 max-sm:pr-6 max-md:pr-8 max-lg:pr-10 px-10 py-4">
            <div className="flex gap-2">
                {/* Closed menu */}
                <div className={"max-lg:flex hidden p-[0.05rem] bg-grey/50 rounded-br-2xl"}>
                    <Link
                        href={"/"}
                        className="relative flex flex-col px-3 py-2 justify-between gap-8 border-r-2 border-b-2 rounded-br-2xl border-primary/100 m-[0.15rem] bg-grey/50"
                    >
                        <Image className="w-10 h-10" src={MiniLogo} alt="Edulaunchbox" />

                        <button
                            onClick={handleToggleMenu}
                            className="absolute right-[1.2rem] top-[2.65rem] flex justify-center max-w-fit max-h-fit p-1 rounded-full bg-grey/50 border border-primary/100"
                        >
                            <IoIosArrowBack size={"1rem"} color="#ADADAD" />
                        </button>
                    </Link>
                </div>
                {pathname === "/" && (
                    <span className="text-primary/300 font-medium my-auto capitalize">Tokens</span>
                )}

                {pathname !== "/" &&
                    pathextract.map((extract, index, arr) => {
                        if (extract === "") return <></>;
                        return (
                            <div className="flex gap-1 flex-nowrap" key={index}>
                                <span className="text-primary/300 font-medium my-auto capitalize">
                                    {extract}
                                </span>
                                {index + 1 < arr.length && <TiChevronRight className="my-auto" />}
                            </div>
                        );
                    })}
            </div>
            <div className="flex my-auto">
                <ConnectWallet>
                    <PrimaryButton
                        text="Connect wallet"
                        as="span"
                        className="w-fit bg-secondary/700 text-grey/50  flex justify-center w-full max-md:text-[0.875rem] p-2 rounded-lg font-semibold"
                    />
                </ConnectWallet>
            </div>
        </nav>
    );
}
