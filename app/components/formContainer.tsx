import { Dispatch, SetStateAction, useState } from "react";
import { BsCurrencyDollar } from "react-icons/bs";
import { IoCheckmark } from "react-icons/io5";

export default function FormContainer({
  children,
  currentState,
}: {
  children?: React.ReactNode;
  currentState: number;
}) {
  return (
    <form className="flex p-[0.2rem] rounded-3xl bg-grey/50">
      <div className="border border-primary/100 shadow-inner shadow-grey/50 rounded-3xl w-full flex flex-col bg-gradient-to-b from-primary/100/70 from-5% via-primary/100/50 via-10% to-white to-20%">
        <div className="flex gap-8 border-b border-primary/100 px-6 py-4 rounded-t-3xl">
          {["Token Details", "Socials", "Deploy", "Liquidity"].map(
            (text, index) => (
              <FormSteps
                key={index}
                text={text}
                step={index + 1}
                state={
                  currentState === index + 1
                    ? "doing"
                    : index + 1 > currentState
                    ? "undone"
                    : "done"
                }
              />
            )
          )}
        </div>
        <div className="flex h-80 rounded-b-3xl">{children}</div>
      </div>
    </form>
  );
}

export function FormSteps({
  step,
  state,
  text,
}: {
  step: number;
  state: "done" | "doing" | "undone";
  text: string;
}) {
  return (
    <div className="flex gap-2 text-grey/600">
      <span
        className={
          (state === "undone"
            ? " bg-grey/50 text-primary/200"
            : " text-grey/50 bg-primary/500 ") +
          " h-[20px] w-[20px] rounded-full flex place-content-center font-medium my-auto"
        }
      >
        {state === "done" ? (
          <IoCheckmark className="flex my-auto" />
        ) : (
          <span className="flex my-auto leading-none">{step}</span>
        )}
      </span>
      <span
        className={
          (state !== "undone" ? " text-primary/500" : " text-grey/600 ") +
          (state === "doing" ? " font-bold " : " font-medium ") +
          " flex my-auto"
        }
      >
        {text}
      </span>
    </div>
  );
}
