"use client";
import { usePathname } from "next/navigation";
import { Button } from "../components/buttons";
import arrowHead from "../assets/images/arrowHead.svg";
import { useMemo } from "react";

export default function NavBar() {
  const pathname = usePathname();
  const pathextract = useMemo(() => {
    return pathname.split("/").map((str) => str.split("-").join(" "));
  }, [pathname]);

  return (
    <nav className="flex w-full justify-between bg-transparent px-10 py-4">
      <span className="text-primary/300 font-medium my-auto capitalize">
        {pathname === "/" ? "Tokens" : pathextract}
      </span>
      <div className="flex w-36 my-auto">
        <Button text="Connect Wallet" color="green" />
      </div>
    </nav>
  );
}
