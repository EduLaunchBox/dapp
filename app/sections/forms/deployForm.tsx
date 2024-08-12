"use client";
import { Button } from "@/app/components/buttons";
import FormContainer from "@/app/components/formContainer";
import Image from "next/image";
import defaultImage from "../../assets/images/default_token.svg";
import successfulDeployment from "../../assets/images/successfulDeployment.svg";
import { MdOutlineNorthEast } from "react-icons/md";

export default function DeployForm() {
  const DetailRow = ({
    title,
    value,
    logo,
    className,
  }: {
    title: string;
    value: string;
    logo?: any;
    className?: string;
  }) => {
    return (
      <div className={className + " flex gap-2 flex-nowrap"}>
        <span className="flex font-bold text-grey/800 w-32">{title}</span>
        <span className="flex font-medium text-nowrap">{value}</span>
      </div>
    );
  };
  return (
    <FormContainer
      className="flex w-full p-6 flex-col justify-between gap-4"
      currentState={1}
    >
      <div className="flex flex-col gap-4">
        <span className="flex font-bold text-grey/800">Token Details</span>
        <div className="flex gap-2">
          <div className="flex basis-1/4">
            <Image src={defaultImage} alt={"token logo"} />
          </div>
          <div className="flex basis-1/4 flex-col">
            <DetailRow title="Token Name" value="University" />
            <DetailRow title="Token Symbol" value="UNI" />
            <DetailRow title="Token Supply" value="10,000,000 UNI" />
            <DetailRow title="Network" logo={"cc"} value="Etherium" />
          </div>
        </div>
        <div className="flex gap-6 justify-between">
          <span className="flex font-bold text-grey/800">Socials</span>
          {/* Max string length the length of below value */}
          <DetailRow title="Twitter" value="https://x.com/profile/univers..." />
        </div>

        {/* For when deployed */}
        <div className="flex flex-col bg-primary/50 border-2 border-primary/100 rounded-xl pb-2">
          <div className="mx-auto flex ">
            <Image src={successfulDeployment} alt="Successful Deployment" />
          </div>
          <span className="flex mx-auto text-secondary/700 font-bold">
            Token successfully deployed
          </span>
        </div>

        <div className="flex gap-6 justify-between">
          <span className="flex font-bold text-grey/800 my-auto">Contract</span>
          {/* Max string length the length of below value */}
          <div className="flex gap-4">
            <DetailRow
              className="my-auto"
              title="Token address"
              value="0x61299774020dA44..."
            />
            <button className="flex p-2 border-2 border-grey/200 bg-grey/70 my-auto rounded-lg">
              <MdOutlineNorthEast />
            </button>
          </div>
        </div>
      </div>

      <div className="flex w-full pt-4 gap-6">
        <div className="flex basis-1/4">
          <Button text={"Edit"} arrow={"backward"} />
        </div>

        <div className="flex basis-3/4">
          <Button text={"Deploy"} color="green" />
        </div>
      </div>

      {/* For when deployed */}
      <div className="flex w-full pt-4">
        <Button text={"Add Liquidity on DEX"} color="green" />
      </div>
    </FormContainer>
  );
}
