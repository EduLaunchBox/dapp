import { Button } from "@/app/components/buttons";

export default function SkipPopover() {
  return (
    <div className="fixed top-0 left-0 h-screen w-screen flex bg-black/20 justify-center overflow-none overscroll-none">
      <div className="flex my-auto bg-white z-10 flex-col gap-6 p-4 rounded-2xl">
        <div>
          <h2 className="flex text-grey/800 text-[1.75rem] font-bold ">
            Skip this step?
          </h2>
        </div>
        <div className="flex flex-col gap-4 max-w-[30rem] text-grey/800 font-medium">
          <span>
            You are about to skip the process of adding liquidity to the Token
            to facilitate token trade.
          </span>
          <span>
            Should you chose to skip, can still add LPP to this token at the
            Liquidity section or you can add Liquidity on any app on EDUCHAIN
            you want.
          </span>
        </div>
        <div className="flex gap-2">
          <Button text="Go Back" className="border-none" />
          <Button text="Skip" />
        </div>
      </div>
    </div>
  );
}
