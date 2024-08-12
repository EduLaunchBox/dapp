import { MouseEventHandler } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export function Button({
  arrow,
  text,
  color,
  onclick,
  className,
}: {
  arrow?: "forward" | "backward";
  text: string;
  color?: "white" | "green";
  onclick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}) {
  return (
    <button
      className={
        (color === "green"
          ? "bg-secondary/700 text-grey/50 "
          : " border-2 border-grey/200 text-grey/800 ") +
        " flex justify-center w-full p-2 rounded-lg font-semibold " +
        className
      }
      onClick={onclick}
    >
      <div className="flex gap-2 mx-auto">
        {arrow === "backward" && <FaChevronLeft className="flex my-auto" />}
        <span className="flex my-auto">{text}</span>
        {arrow === "forward" && <FaChevronRight className="flex my-auto" />}
      </div>
    </button>
  );
}
