import {
  Button,
  ToggleButton,
  ToggleButtonDarker,
} from "@/app/components/buttons";
import { BiCloset } from "react-icons/bi";
import { GrClose } from "react-icons/gr";

export default function TokenSplitting() {
  return (
    <div className="fixed top-0 left-0 h-screen w-screen flex bg-black/20 justify-center overflow-none overscroll-none">
      <div className="flex my-auto bg-white z-10 flex-col gap-6 border border-primary/100 rounded-3xl">
        <div className="flex justify-between border-b border-b-primary/100 pt-6 pb-2 px-6">
          <h4 className="flex text-[1.2rem] text-grey/800 font-extrabold text-nowray">
            Token Splitting
          </h4>
          <button className="w-8 h-8 border-grey/200 justify-center rounded-full bg-grey/70">
            <GrClose className="flex mx-auto" />
          </button>
        </div>
        <div className="flex px-6 flex-col gap-8 pb-8">
          <div className="flex justify-between">
            <span>Enable Token Splitting</span>
            <ToggleButtonDarker isTrue={false} />
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <span>Select Type</span>
              <div className="flex gap-3">
                <button className="flex justify-center py-2 px-10 rounded-lg bg-grey/100-alt">
                  <span className="text-grey/700 font-medium">1 for 1</span>
                </button>
                <button className="flex justify-center py-2 px-10 rounded-lg bg-grey/100-alt">
                  <span className="text-grey/700 font-medium">5 for 1</span>
                </button>
                <button className="flex justify-center py-2 px-10 rounded-lg bg-grey/100-alt">
                  <span className="text-grey/700 font-medium">10 for 1</span>
                </button>
              </div>
            </div>

            <div className="flex justify-between gap-3 ">
              <span className="flex w-full h-px bg-[#DADADA] my-auto"></span>
              <span className="text-grey/700 font-medium my-auto">or</span>
              <span className="flex w-full h-px bg-[#DADADA] my-auto"></span>
            </div>

            <div className="flex gap-4">
              <div className="flex w-full">
                <input
                  placeholder="Custom"
                  className="flex w-full border-[0.15rem] border-grey/300 placeholder-grey/300 p-2 rounded-lg outline-none my-auto"
                />
              </div>
              <span className="text-nowrap text-grey/700 font-medium my-auto">
                for 1
              </span>
            </div>
          </div>

          <div>
            <Button text="Apply" color="green" />
          </div>
        </div>
      </div>
    </div>
  );
}
