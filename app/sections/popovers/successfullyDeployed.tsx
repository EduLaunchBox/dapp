import { Button } from "@/app/components/buttons";
import Image from "next/image";
import { FiCopy } from "react-icons/fi";
import { MdOutlineNorthEast } from "react-icons/md";
import deployedPng from "../../assets/images/deployed.png";

export default function SuccessfullyDeployed({
  type,
}: {
  type: "token" | "lp" | "both";
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
          {type} Contract Address
        </span>
        <div className="flex gap-2 justify-between w-full">
          <span className="max-w-68 text-[#222222] font-bold truncate">
            {address}
          </span>

          <div className="flex gap-2">
            <button className="bg-grey/70 border border-grey/200 p-2 rounded-lg">
              <FiCopy size={"1.2rem"} />
            </button>
            <button className="bg-grey/70 border border-grey/200 p-2 rounded-lg">
              <MdOutlineNorthEast size={"1.2rem"} />
            </button>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="fixed top-0 left-0 h-screen w-screen flex bg-black/20 justify-center overflow-none overscroll-none">
      <div className="flex my-auto bg-white z-10 flex-col gap-6 p-4 rounded-2xl">
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
            <ContractAddress
              type="Token"
              address="0x61299774020dA444Af134c82fa83E3810b309991"
            />
          )}
          {(type === "lp" || type === "both") && (
            <ContractAddress
              type="LP"
              address="0x61299774020dA444Af134c82fa83E3810b309991"
            />
          )}
        </div>

        <div>
          <Button text="Close" />
        </div>
      </div>
    </div>
  );
}
