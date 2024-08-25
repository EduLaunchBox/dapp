"use client";
import { Button } from "@/app/components/buttons";
import FormContainer from "@/app/components/formContainer";
import Image from "next/image";
import defaultImage from "../../assets/images/default_token.svg";
import successfulDeployment from "../../assets/images/successfulDeployment.svg";
import { MdOutlineNorthEast } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { useState } from "react";
import { NetworkType, TokenDetails } from "@/app/types";
import { useAccount } from "wagmi";
import EduLaunchBoxFactoryAbi from "../../lib/abi/EduLaunchBoxFactory.json";
import { ethers } from "ethers";
import { config, educhain } from "../../providers/wagmi/config";
import { getEthersSigner } from "@/app/providers/ethers";
import { stringTruncater } from "@/app/lib/utils";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import { Address } from "viem";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import tokenABI from "../../lib/abi/ERC20Abi.json";

const senderAddress = process.env.NEXT_PUBLIC_SENDER_ADDRESS as Address;
const edulaunchboxFactoryAddress = process.env
  .NEXT_PUBLIC_EDULAUNCHBOX_FACTORY as Address;

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
  const route = useRouter();
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const { oldTokenAddress } = useAppSelector((state) => state.migrateToken);

  const [tokenDeployed, setTokenDeployed] = useState(false);
  const [tokenData, setTokenData] = useState(tokenDetails);
  const [buttonLoading, setButtonloading] = useState(false);
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

  const handleMigrate = async (tokenAddress: string) => {
    const { data } = await axios.post("api/tokens/transfer", {
      tokenAddress,
      oldTokenAddress,
      tokenOwner: address,
    });
    console.log(data);
  };

  const approveMigrateTokens = async (tokenAddress: string, amount: string) => {
    try {
      const signer = await getEthersSigner(config);
      const tokenContract = new ethers.Contract(tokenAddress, tokenABI, signer);
      const tx = await tokenContract.approve(senderAddress, amount);
      await tx.wait();
      console.log(tx);
    } catch (error) {
      console.error("Error requesting approval:", error);
    }
  };

  const handleDeploy = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setButtonloading(true);
    let tokenDataCopy = { ...tokenDetails }; // Copy for use within this function

    // Prompt user to connect wallet.
    if (!address) {
      Swal.fire({
        title: "Error!!",
        text: "Please connect your wallet.",
        icon: "error",
        confirmButtonText: "Okay",
      }).finally(() => setButtonloading(false));
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
      tokenDataCopy = { ...tokenDetails, logoUrl: data.url };
    } catch (error) {
      Swal.fire({
        title: "Error!!",
        text: "Could not updateyour image.",
        icon: "error",
        confirmButtonText: "Okay",
      }).finally(() => setButtonloading(false));
      return;
    }

    // Deploy smart contract to get contract Address
    try {
      // Define the contract configuration
      const signer = await getEthersSigner(config);
      const contract = new ethers.Contract(
        edulaunchboxFactoryAddress,
        EduLaunchBoxFactoryAbi,
        signer
      );

      // Contract parameters
      const name = tokenDetails.tokenName;
      const symbol = tokenDetails.tokenSymbol;
      const tokenSupply = ethers.parseEther(
        tokenDetails.tokenSupply.toLocaleString().replaceAll(",", "")
      );

      // Get Contract address
      const salt = await contract.getdeployedLaunchBoxesLen(address);
      const byteCode = await contract.getBytecode(name, symbol, tokenSupply);
      const contractAddress = await contract.getAddressCreate2(byteCode, salt);
      tokenDataCopy.contract = contractAddress;

      // Token Launch
      const tokenLaunch = await contract.newLaunchBox(
        name,
        symbol,
        tokenSupply
      );
      await tokenLaunch.wait();
      if (pathname.includes("migrate-tokens")) {
        await approveMigrateTokens(contractAddress, tokenSupply.toString());
        await handleMigrate(contractAddress);
      }

      setTokenData(tokenDataCopy);
      setTokenDeployed(true);
      setTokenDeployed(true);
    } catch (error) {
      Swal.fire({
        title: "Error!!",
        text: "Could not deploy token. Please try again.",
        icon: "error",
        confirmButtonText: "Try Again.",
        cancelButtonText: "Okay",
      })
        .then(({ isConfirmed }) => {
          if (isConfirmed) route.refresh();
        })
        .finally(() => setButtonloading(false));
      return;
    }

    // Update database.
    try {
      await fetch("/api/tokens", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...tokenDataCopy,
          logo: null,
          network: {
            name: tokenDetails?.network?.name || educhain.name,
            logoUrl: tokenDetails?.network?.logoUrl || educhain.iconUrl,
            explorerUrl:
              tokenDetails?.network?.explorerUrl ||
              educhain.blockExplorers.default.url,
            chainId: tokenDetails?.network?.chainId || educhain?.id,
          } as NetworkType,
          deployer: address,
          totalSupply: tokenDetails.tokenSupply
            .toLocaleString()
            .replaceAll(",", ""),
        }),
      });
      setButtonloading(false);
    } catch (error) {
      Swal.fire({
        title: "Error!!",
        text: "Could not save token details. Try re-deploying.",
        icon: "error",
        confirmButtonText: "Redeploy.",
        cancelButtonText: "Okay",
      })
        .then(({ isConfirmed }) => {
          if (isConfirmed) route.refresh();
        })
        .finally(() => setButtonloading(false));
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
        <span className="flex justify-center font-medium text-nowrap gap-1.5">
          {logo && (
            <Image
              src={logo}
              alt="Network"
              width={250}
              height={250}
              className="flex object-fit h-6 w-6 rounded-full "
            />
          )}
          <span>{value}</span>
        </span>
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
              className="w-24 h-24 mx-auto object-fit"
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
              value={`${tokenDetails?.tokenSupply
                ?.toLocaleString()
                .replaceAll(",", "")} ${tokenDetails?.tokenSymbol}`}
            />
            <DetailRow
              title="Network"
              logo={educhain.iconUrl}
              value={tokenDetails?.network?.name || educhain?.name}
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
                {/* Add Link: */}
                <DetailRow
                  className="my-auto"
                  title="Token address"
                  value={stringTruncater(tokenData.contract)}
                />
                <Link
                  target={"_blank"}
                  href={`https://opencampus-codex.blockscout.com/token/${tokenData.contract}`}
                  className="flex max-sm:p-1.5 p-2 border-2 cursor-pointer border-grey/200 bg-grey/70 my-auto rounded-lg"
                >
                  <MdOutlineNorthEast />
                </Link>
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
            <Button
              loading={buttonLoading}
              onclick={handleDeploy}
              text={"Deploy"}
              color="green"
            />
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
