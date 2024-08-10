"use client";
import { usePathname } from "next/navigation";
import { Button } from "../components/buttons";

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="flex w-full justify-between bg-transparent px-10 py-4">
      <span className="text-primary/300 font-medium my-auto">
        {pathname === "/" ? "Tokens" : ""}
      </span>
      <div className="flex w-36 my-auto">
        <Button text="Connect Wallet" color="green" />
      </div>
    </nav>
  );
}
