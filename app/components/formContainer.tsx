import { IoCheckmark } from "react-icons/io5";

export default function FormContainer({
  children,
  currentState,
  className,
  stateToShow,
}: {
  children?: React.ReactNode;
  className?: string;
  currentState: number;
  stateToShow: number; // the state that this form should show at
}) {
  return (
    <form
      className={
        (stateToShow === currentState ? "flex " : "hidden") +
        " p-[0.2rem] rounded-3xl bg-grey/50"
      }
    >
      <div className="border border-primary/100 shadow-inner shadow-grey/50 rounded-3xl w-full flex flex-col bg-gradient-to-b from-primary/100/70 from-5% via-primary/100/50 via-10% to-white to-20%">
        {/* Using negative numbers to represent when i do not want it to show those steps */}
        {currentState !== -1 && (
          <div className="flex max-sm:gap-6 max-xs:gap-4 gap-8 border-b border-primary/100 max-sx:justify-between px-6 py-4 rounded-t-3xl">
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
        )}

        {/* Negative 1 is for add liquidity */}
        {currentState === -1 && (
          <div className="flex gap-8 border-b border-primary/100 px-6 py-4 rounded-t-3xl">
            <span className="mx-auto font-bold text-primary/500 max-md:text-[1rem] text-[1.2rem]">
              Add Liquidity
            </span>
          </div>
        )}
        <div className={className}>{children}</div>
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
    <div className="flex gap-2 mx-auto text-grey/600">
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
          <span className="flex my-auto leading-none max-sm:text-[0.875rem]">
            {step}
          </span>
        )}
      </span>
      <span
        className={
          (state !== "undone" ? " text-primary/500" : " text-grey/600 ") +
          (state === "doing" ? " font-bold " : " font-medium max-xs:hidden ") +
          " flex my-auto max-sm:text-[0.875rem]"
        }
      >
        {text}
      </span>
    </div>
  );
}
