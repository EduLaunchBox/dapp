import { Button } from "@/app/components/buttons";
import Image from "next/image";
import { FiCopy } from "react-icons/fi";
import { MdOutlineNorthEast } from "react-icons/md";
import deployedPng from "../../assets/images/deployed.png";
import { Dispatch, SetStateAction } from "react";
import PopoverContainer from "./popoverContainer";
import Link from "next/link";

export default function SuccessfullyDeployed({
  type,
  show,
  setShow,
  lpAddress,
  tokenAddress,
}: {
  type: "token" | "lp" | "both";
  show: boolean;
  lpAddress: string;
  tokenAddress: string;
  setShow: Dispatch<SetStateAction<boolean>>;
}) {
  const ContractAddress = ({
    type,
    address,
  }: {
    type: string;
    address: string;
  }) => {
    return (
      <div className="flex flex-col gap-1">
        <span className="flex text-[0.875rem] font-bold text-[#646464]">
          {type.toLowerCase() === "LP".toLowerCase()
            ? "LP Transaction hash"
            : "Token Contract Address"}
        </span>
        <div className="flex gap-2 justify-between w-full">
          <span className="max-w-68 text-[#222222] font-bold truncate">
            {address}
          </span>

          <div className="flex gap-2">
            <button className="bg-grey/70 border border-grey/200 p-2 rounded-lg">
              <FiCopy size={"1.2rem"} />
            </button>
            <Link
              target={"_blank"}
              href={`https://opencampus-codex.blockscout.com/${
                type.toLowerCase() === "LP".toLowerCase() ? "tx" : "token"
              }/${address}`}
              className="bg-grey/70 border pointer-cusor border-grey/200 p-2 rounded-lg"
            >
              <MdOutlineNorthEast size={"1.2rem"} />
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <PopoverContainer
      className="flex my-auto bg-white z-10 flex-col gap-6 p-4 rounded-2xl"
      show={show}
      setShow={setShow}
    >
      <div className="flex justify-center bg-primary/50 border border-primary/100 rounded-xl w-full h-52">
        <Image
          className="flex w-3/5 h-3/5 object-fit mx-auto my-auto"
          src={deployedPng}
          alt={"Successfully Deploed"}
        />
      </div>

      <div>
        <h3
          className={
            (type === "both" ? "flex-col " : "flex-row  gap-1 ") +
            " flex font-bold text-[1.2rem] text-primary/500 "
          }
        >
          <span className="flex gap-1 mx-auto">
            {type === "token" && <span>Token deployed successfully</span>}
            {type === "both" && (
              <span className="max-w-[20rem] text-center">
                Token deployed and LP added successfully
              </span>
            )}
            {type === "lp" && <span>LP added successfully</span>}
          </span>
        </h3>
      </div>

      <div className="flex flex-col gap-2">
        {(type === "token" || type === "both") && (
          <ContractAddress type="Token" address={tokenAddress} />
        )}
        {(type === "lp" || type === "both") && (
          <ContractAddress type="LP" address={lpAddress} />
        )}
      </div>

      <div>
        <Button onclick={() => setShow(false)} text="Close" />
      </div>
    </PopoverContainer>
  );
}
