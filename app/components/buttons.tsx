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
        " flex justify-center w-full max-md:text-[0.875rem] p-2 rounded-lg font-semibold " +
        className
      }
      onClick={onclick}
    >
      <div className="flex max-md:gap-1.5 gap-2 mx-auto">
        {arrow === "backward" && <FaChevronLeft className="flex my-auto" />}
        <span className="flex my-auto">{text}</span>
        {arrow === "forward" && <FaChevronRight className="flex my-auto" />}
      </div>
    </button>
  );
}

export function ToggleButton({
  isTrue,
  onclick,
}: {
  isTrue: boolean;
  onclick?: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      type={"button"}
      onClick={onclick}
      className={
        (isTrue ? "pl-[1.4rem] " : "pl-[0.2rem] ") +
        " flex transition[padding] duration-200 ease-in-out w-11 h-6 rounded-xl bg-grey/100-alt shadow-inner px-[0.2rem]"
      }
    >
      <span className="flex w-5 h-5 bg-grey/50 rounded-full drop-shadow my-auto"></span>
    </button>
  );
}

export function ToggleButtonDarker({
  isTrue,
  onclick,
}: {
  isTrue: boolean;
  onclick?: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      type={"button"}
      onClick={onclick}
      className={
        (isTrue ? "pl-[1.4rem] " : "pl-[0.2rem] ") +
        " flex transition[padding] duration-200 ease-in-out w-11 h-6 rounded-xl bg-primary/100 shadow-inner px-[0.2rem]"
      }
    >
      <span className="flex w-5 h-5 bg-primary/500 rounded-full drop-shadow my-auto"></span>
    </button>
  );
}
