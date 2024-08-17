"use client";
import { Button, ToggleButton } from "@/app/components/buttons";
import FormContainer from "@/app/components/formContainer";
import { SelectInput } from "@/app/components/inputsBoxes";
import Image from "next/image";
import { useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import eduLogo from "../../assets/images/edu.png";
import uniLogo from "../../assets/images/uni.png";
import { PiPlus } from "react-icons/pi";
import { TwoStepBar } from "@/app/components/progressBar";

export default function AddLiquidityForm({ formStep }: { formStep: number }) {
  const [dex, setDex] = useState("");
  const [toNotStake, setToNotStake] = useState(false);

  return (
    <FormContainer
      stateToShow={formStep === -1 ? -1 : 4}
      className="flex w-full p-4 flex-col gap-8"
      currentState={formStep}
    >
      <div className="flex flex-col gap-2 ">
        <h3 className="flex text-[1.2rem] font-bold text-primary/500">
          Add Liquidity
        </h3>
        <div className="flex gap-2 border border-primary/100 bg-primary/50 rounded-lg p-2">
          <div className="flex">
            <span className="flex p-2 my-auto rounded-full bg-primary/100">
              <AiOutlineInfoCircle size={"1.2rem"} color="#637FE3" />
            </span>
          </div>
          <p className="text-wrap text-pretty max-w-[28rem] text-primary/300 text-[0.875rem]">
            <span className="font-bold">Note:</span> Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Duis in ante in eros hendrerit pharetra
            non eu ex. Phasellus mattis, lectus nec facilisis sollicitudin, est
            enim blandit nibh.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {/* Inputs go here */}
        <SelectInput
          labelName={"Select dex to add liquidity to:"}
          id={"addLiquidity"}
          setValue={setDex}
        >
          <option>Sailfish</option>
        </SelectInput>

        <div className="flex flex-col gap-2">
          <span className="flex font-medium text-grey/700 max-sm:text-[0.875rem]">
            Quote Token
          </span>
          <TokenInput logo={eduLogo} symbol={"EDU"} balance={"10,685.83"} />
        </div>

        <div className="flex w-full">
          <PiPlus className="flex mx-auto" />
        </div>

        <div className="flex flex-col gap-2">
          <span className="flex font-medium text-grey/700 max-sm:text-[0.875rem]">
            Base Token
          </span>
          <TokenInput logo={uniLogo} symbol={"UNI"} balance={"10,685.83"} />
        </div>

        <div className="flex w-full pt-2">
          <PriceAndPool quoteSymbol={"EDU"} baseSymbol={"UNI"} />
        </div>

        <div className="flex w-full">
          <span className="flex max-w-[32rem] text-[0.875rem]">
            LP wil be added to the pool to facilitate swap. LP will also be
            locked for {`{period}`} of time. Unlocks will be impossible until
            the period expires.
          </span>
        </div>

        <div className="flex gap-2">
          {/* Toggle Button here */}
          <ToggleButton
            isTrue={toNotStake}
            onclick={() => setToNotStake(!toNotStake)}
          />
          <span className="flex my-auto text-[0.875rem]">
            Add liquidity only and not stake LP
          </span>
        </div>

        <div className="flex w-full justify-center my-2">
          {/* Approve Token and Add Lp line goes here */}
          <TwoStepBar
            stepOne={{
              name: "Approve Token",
              status: !toNotStake ? "doing" : "done",
            }}
            stepTwo={{
              name: "Add LP",
              status: !toNotStake ? "undone" : "doing",
            }}
          />
        </div>
      </div>

      <div className="flex flex-col justify-between gap-2">
        <Button text={"Approve UNI"} color="green" />
        <Button text={"Skip"} className="border-none" />
      </div>
    </FormContainer>
  );
}

const PriceAndPool = ({
  quoteSymbol,
  baseSymbol,
}: {
  quoteSymbol: string;
  baseSymbol: string;
}) => {
  return (
    <div className="flex w-full flex-col rounded-3xl border bg-grey/70 border-primary/100">
      <div className="flex w-full border-b border-primary/100 py-2 ">
        <span className="flex mx-auto font-bold max-sm:text-[0.875rem] text-grey/700">
          Price & Pool share
        </span>
      </div>
      <div className="flex justify-around max-sm:text-[0.875rem] py-4">
        <div className="flex flex-col">
          <span className="flex mx-auto text-grey/900 font-bold">2,038</span>
          <span className="flex text-grey/500 font-bold">
            {quoteSymbol} per {baseSymbol}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="flex mx-auto text-grey/900 font-bold">0.0027</span>
          <span className="flex text-grey/500 font-bold">
            {baseSymbol} per {quoteSymbol}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="flex mx-auto text-grey/900 font-bold">100%</span>
          <span className="flex text-grey/500 font-bold">Pool share</span>
        </div>
      </div>
    </div>
  );
};

const TokenInput = ({
  logo,
  symbol,
  balance,
}: {
  logo: any;
  symbol: string;
  balance: string;
}) => {
  return (
    <div className="flex flex-col w-full bg-grey/70 border border-grey/200 rounded-3xl px-3 py-2">
      <div className="flex w-full gap-2">
        <input
          className="flex w-full bg-transparent border-none leading-none outline-none max-sm:text-[1.5rem] text-[2rem] font-medium placeholder-grey/400"
          placeholder="0.00"
        />
        <button className="flex h-fit py-[0.2rem] rounded-full border border-grey/200 bg-grey/100-alt my-auto">
          <Image
            className="flex w-6 h-6 rounded-full object-fit my-auto m-[0.2rem]"
            src={logo}
            alt={symbol}
          />
          <span className="flex uppercase max-sm:text-[0.875rem] font-bold my-auto pr-6 pl-1 text-primary/500">
            {symbol}
          </span>
        </button>
      </div>

      <div className="flex w-full justify-between text-grey/400 max-sm:text-[0.875rem]">
        <span>$0.00</span>
        <div className="flex max-sm:text-[0.875rem] max-sm:gap-2 gap-4">
          <div>
            <span>Balance: </span>
            <span>{balance}</span>
          </div>
          <button className="flex text-grey/700 px-2 font-bold">Max</button>
        </div>
      </div>
    </div>
  );
};
