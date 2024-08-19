"use client";
import { Button } from "@/app/components/buttons";
import FormContainer from "@/app/components/formContainer";
import Image from "next/image";
import defaultImage from "../../assets/images/default_token.svg";
import successfulDeployment from "../../assets/images/successfulDeployment.svg";
import { MdOutlineNorthEast } from "react-icons/md";
import { useAppDispatch } from "@/app/store/hooks";
import { useState } from "react";
import { TokenDetails } from "@/app/types";
import { useAccount } from "wagmi";
import EduLaunchBoxFactoryAbi from "../../lib/abi/EduLaunchBoxFactory.json";
import { ethers } from "ethers";
import { config } from "../../providers/wagmi/config";
import { getEthersSigner } from "@/app/providers/ethers";
import { stringTruncater } from "@/app/lib/utils";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

export default function DeployForm({
  formStep,
  nextStep,
  prevStep,
  tokenDetails,
}: {
  formStep: number;
  nextStep: ActionCreatorWithPayload<TokenDetails, any>;
  prevStep: any;
  tokenDetails: TokenDetails;
}) {
  const dispatch = useAppDispatch();
  const [tokenDeployed, setTokenDeployed] = useState(false);
  const [tokenData, setTokenData] = useState(tokenDetails);
  const { address } = useAccount();

  const handleNext = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    dispatch(nextStep(tokenData));
  };

  const handlePrev = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    dispatch(prevStep());
  };

  const handleDeploy = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    let tokenDataCopy = { ...tokenData }; // Copy for use within this function

    // Prompt user to connect wallet.
    if (!address) {
      alert("Please connect your wallet");
      return;
    }

    // Upload Image to cloudinary and get logoUrl
    try {
      const res = await fetch("/api/image-upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: tokenDetails.logo }),
      });

      const data = await res.json();
      tokenDataCopy = { ...tokenData, logoUrl: data.url };
    } catch (error) {
      console.error("Error uploading file:", error);
      return;
    }

    // Deploy smart contract to get contract Address
    try {
      // Define the contract configuration
      const signer = await getEthersSigner(config);
      const contract = new ethers.Contract(
        "0x7584F11Fd490C64886F13396eE5fE58d477D8444", // todo: add to dotenv
        EduLaunchBoxFactoryAbi,
        signer
      );

      // Contract parameters
      const name = tokenData.tokenName;
      const symbol = tokenData.tokenSymbol;
      const tokenSupply = ethers.parseEther(tokenData.tokenSupply.toString());

      // Get Contract address
      const salt = await contract.getdeployedLaunchBoxesLen(address);
      const byteCode = await contract.getBytecode(name, symbol, tokenSupply);
      const contractAddress = await contract.getAddressCreate2(byteCode, salt);
      tokenDataCopy.contract = contractAddress;

      // Token Launch
      await contract.newLaunchBox(name, symbol, tokenSupply);
      setTokenData(tokenDataCopy);
      setTokenDeployed(true);
    } catch (error) {
      console.error("Error deploying contract:", error);
      return;
    }

    // Update database.
    // Todo: Update network type to have required network info
    try {
      const res = await fetch("/api/tokens", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...tokenDataCopy,
          logo: null,
          network: "Etherium",
          deployer: address,
        }),
      });

      const data = await res.json();
      console.log(data);
    } catch (error) {
      // TODO: Might provide another way for them to add the details ti the database in the error
      console.error("Error saving data to db:", error);
      return;
    }
  };

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
      <div
        className={className + " flex gap-2 max-xs:text-[0.875rem] flex-nowrap"}
      >
        <span className="flex font-bold text-grey/800 max-xs:w-24 w-32">
          {title}
        </span>
        <span className="flex font-medium text-nowrap">{value}</span>
      </div>
    );
  };

  return (
    <FormContainer
      stateToShow={3}
      className="flex w-full max-sm:p-4 p-6 flex-col justify-between gap-4"
      currentState={formStep}
    >
      <div className="flex flex-col gap-4">
        <span className="flex font-bold text-grey/800">Token Details</span>
        <div className="flex gap-2 max-sm:flex-col">
          <div className="flex max-sx:basis-auto basis-1/4">
            <Image
              className="w-10 h-10"
              width={200}
              height={200}
              src={tokenDetails?.logo ? tokenDetails.logo : defaultImage}
              alt={"token logo"}
            />
          </div>
          <div className="flex max-sm:basis-auto basis-1/4 flex-col">
            <DetailRow title="Token Name" value={tokenDetails?.tokenName} />
            <DetailRow title="Token Symbol" value={tokenDetails?.tokenSymbol} />
            <DetailRow
              title="Token Supply"
              value={`${tokenDetails?.tokenSupply} ${tokenDetails?.tokenSymbol}`}
            />
            <DetailRow
              title="Network"
              logo={"cc"}
              value={tokenDetails?.network || "Etherium"}
            />
          </div>
        </div>
        <div className="flex gap-6 max-xs:gap-2 max-xs:flex-col justify-between">
          <span className="flex font-bold text-grey/800">Socials</span>
          {/* Max string length the length of below value */}
          <DetailRow
            title="Twitter"
            value={stringTruncater(tokenDetails?.xUrl!, 32)}
          />
        </div>

        {/* For when deployed */}
        {tokenDeployed && tokenData.contract && (
          <>
            <div className="flex flex-col bg-primary/50 border-2 border-primary/100 rounded-xl pb-2">
              <div className="mx-auto flex ">
                <Image src={successfulDeployment} alt="Successful Deployment" />
              </div>
              <span className="flex mx-auto text-secondary/700 font-bold">
                Token successfully deployed
              </span>
            </div>

            <div className="flex max-sm:gap-4 max-sm:flex-col gap-6 justify-between">
              <span className="flex font-bold text-grey/800 my-auto">
                Contract
              </span>
              {/* Max string length the length of below value */}

              <div className="flex max-sm:gap-2 gap-4">
                <DetailRow
                  className="my-auto"
                  title="Token address"
                  value={stringTruncater(tokenData.contract)}
                />
                <button className="flex max-sm:p-1.5 p-2 border-2 border-grey/200 bg-grey/70 my-auto rounded-lg">
                  <MdOutlineNorthEast />
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {!tokenDeployed && (
        <div className="flex w-full max-sm:pt-2 max-sm:gap-2 pt-4 gap-6">
          <div className="flex basis-1/4">
            <Button onclick={handlePrev} text={"Edit"} arrow={"backward"} />
          </div>

          <div className="flex max-sm:basis-auto max-sm:w-full basis-3/4">
            <Button onclick={handleDeploy} text={"Deploy"} color="green" />
          </div>
        </div>
      )}

      {/* For when deployed */}
      {tokenDeployed && tokenData.contract && (
        <div className="flex w-full pt-4">
          <Button
            onclick={handleNext}
            text={"Add Liquidity on DEX"}
            color="green"
          />
        </div>
      )}
    </FormContainer>
  );
}
