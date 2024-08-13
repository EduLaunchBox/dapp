import { CgCheck } from "react-icons/cg";

type StatusType = "undone" | "doing" | "done";
type StepDetailsType = { name: string; status: StatusType };

const CustomCheckbox = ({
  status,
  label,
}: {
  status: StatusType;
  label: string;
}) => {
  return (
    <button
      type="button"
      className={
        (status === "done"
          ? " bg-secondary/700 "
          : status === "doing"
          ? " bg-secondary/700 outline outline-1 outline-secondary/700 outline-offset-2 mx-[3px]"
          : " bg-grey/50 border-2 border-grey/200") +
        " flex w-6 h-6 rounded-full justify-center relative"
      }
    >
      {/* Done State */}
      {status === "done" && <CgCheck size={"1.5rem"} color="white" />}

      {/* Doing State */}
      {status === "doing" && (
        <span className=" flex w-2.5 h-2.5 rounded-full bg-grey/50 my-auto"></span>
      )}

      {/* Undone State */}
      {status === "undone" && (
        <span className=" flex w-3 h-3 rounded-full bg-grey/200 my-auto"></span>
      )}

      <div className="flex absolute top-[1rem]">
        <span className="flex text-nowrap my-2 text-grey/700 font-medium">
          {label}
        </span>
      </div>
    </button>
  );
};

export function TwoStepBar({
  stepOne,
  stepTwo,
}: {
  stepOne: StepDetailsType;
  stepTwo: StepDetailsType;
}) {
  return (
    <div className="flex justify-center gap-0 w-full mx-auto">
      <CustomCheckbox status={stepOne.status} label={stepOne.name} />
      <div className={" flex w-[15rem] bg-grey/200 h-0.5 my-auto"}>
        <span
          className={
            (stepTwo.status === "undone" ? "w-0 " : "w-full ") +
            " flex h-full transition[width] ease-in-out duration-200 bg-secondary/700"
          }
        ></span>
      </div>
      <CustomCheckbox status={stepTwo.status} label={stepTwo.name} />
    </div>
  );
}
