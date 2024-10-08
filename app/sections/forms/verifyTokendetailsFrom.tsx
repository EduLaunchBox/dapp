"use client";
import { Button } from "@/app/components/buttons";
import FormContainer from "@/app/components/formContainer";
import { Input, Label } from "@/app/components/inputsBoxes";
import { useAppDispatch } from "@/app/store/hooks";
import { TokenDetails } from "@/app/types";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import axios from "axios";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { CiSettings } from "react-icons/ci";
import Swal from "sweetalert2";
import { Address } from "viem";

export default function VerifyTokenDetailsForm({
  formStep,
  verificationStep,
  nextStep,
  prevStep,
  tokenDetails,
  verificationNext,
}: {
  formStep: number;
  verificationStep: number;
  nextStep: ActionCreatorWithPayload<TokenDetails, any>;
  prevStep: any;
  tokenDetails: TokenDetails;
  verificationNext: ActionCreatorWithPayload<
    `0x${string}`,
    "migrateToken/verificationNext"
  >;
}) {
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [tokenSupply, setTokenSupply] = useState<number>();
  const [tokenHoldersCount, setTokenHoldersCount] = useState<number>();
  const [logoUrl, setLogoUrl] = useState<string>();
  const [decimals, setDecimals] = useState<number>();
  const [btnLoading, setBtnLoading] = useState(false);
  const [agreed, setAgreed] = useState(true);

  const dispatch = useAppDispatch();
  const TOKEN_DETAILS_API = {
    baseSepolia: {
      holderCount: `https://base-sepolia.blockscout.com/api/v2/tokens/${tokenDetails?.contract}/counters`,
      holdersData: `https://base-sepolia.blockscout.com/api/v2/tokens/${tokenDetails?.contract}/holders`,
      tokenData: `https://base-sepolia.blockscout.com/api/v2/tokens/${tokenDetails?.contract}`,
    },
  };

  const handleNext = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (!tokenName || !tokenSymbol || !tokenSupply) {
      Swal.fire({
        title: "Error!!",
        text: "Please ensure all inputs are filled.",
        icon: "error",
        cancelButtonText: "Okay",
      }).finally(() => setBtnLoading(false));
      return;
    }

    dispatch(verificationNext(tokenDetails?.contract as Address));
    dispatch(
      nextStep({
        ...tokenDetails,
        tokenName: tokenName,
        tokenSupply: tokenSupply!,
        tokenSymbol: tokenSymbol,
        holders: tokenHoldersCount,
        decimal: decimals || 18,
        logoUrl: logoUrl,
      })
    );
  };

  const handlePrev = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    dispatch(prevStep());
  };

  useEffect(() => {
    if (verificationStep === 2 && tokenDetails?.contract) {
      (async () => {
        try {
          // Get token details
          setBtnLoading(true);
          const tokenDetailsResponse = await axios.get(
            TOKEN_DETAILS_API.baseSepolia.tokenData
          );
          if (tokenDetailsResponse?.data?.address === tokenDetails?.contract) {
            setTokenName(tokenDetailsResponse?.data?.name);
            setTokenSupply(
              Number(
                ethers.formatUnits(tokenDetailsResponse?.data?.total_supply)
              )
            );
            setTokenSymbol(tokenDetailsResponse?.data?.symbol);
            setDecimals(Number(tokenDetailsResponse?.data?.decimals));
            setLogoUrl(tokenDetailsResponse?.data?.icon_url);
          }

          // Get token holders count
          const holdersCountResponse = await axios.get(
            TOKEN_DETAILS_API.baseSepolia.holderCount
          );
          if (holdersCountResponse?.data?.token_holders_count)
            setTokenHoldersCount(
              holdersCountResponse?.data?.token_holders_count
            );
          setBtnLoading(false);
        } catch (error) {
          Swal.fire({
            title: "Error!!",
            text: (error as any)?.message || "Something Went wrong",
            icon: "error",
            cancelButtonText: "Okay",
          }).finally(() => setBtnLoading(false));
        }
      })();
    }
  }, [
    TOKEN_DETAILS_API.baseSepolia.holderCount,
    TOKEN_DETAILS_API.baseSepolia.tokenData,
    tokenDetails?.contract,
    verificationStep,
  ]);

  return (
    <FormContainer
      stateToShow={verificationStep === 2 ? 1 : 0}
      className="flex w-full p-4 flex-col gap-8"
      currentState={formStep}
    >
      <div className="flex">
        <span className="flex text-grey/800 font-bold">
          Verify token details and Migrate to EDU
        </span>
      </div>

      <div className="flex flex-col w-full gap-4">
        <Input
          labelName={"Token Name"}
          id={"tokenName"}
          placeholder={"Enter name of Token in full"}
          value={tokenName}
          setValue={setTokenName}
        />
        <Input
          labelName={"Token Symbol"}
          id={"tokenSymbol"}
          placeholder={"Enter token abbreviations"}
          value={tokenSymbol}
          setValue={setTokenSymbol}
        />
        <Input
          labelName={"Token Supply"}
          id={"totalSupply"}
          placeholder={"10,000,000"}
          inputType="number"
          value={tokenSupply}
          setValue={setTokenSupply}
          className="basis-2/3"
        />
        <div className="flex flex-col gap-2 w-full">
          <Label text={"Current Token holders"} htmlFor={""} />
          <div className="flex w-full border border-grey/200 bg-grey/70 rounded-lg p-2">
            <span className="flex text-grey/800">
              {tokenHoldersCount} Holders
            </span>
          </div>
        </div>

        <div className="flex gap-2 border border-primary/100 bg-primary/50 rounded-lg p-2">
          <div className="flex">
            <span className="flex p-2 my-auto rounded-full bg-primary/100">
              <AiOutlineInfoCircle size={"1.2rem"} />
            </span>
          </div>
          <p className="text-wrap text-pretty max-w-[28rem] text-primary/300 text-[0.875rem]">
            <span className="font-bold">Note:</span> Newly minted tokens on
            EDUCHAIN will distribute tokens to current token holders using
            balance at snapshot 4 Aug, 12:00 GMT+1. Check the box below to agree
            that you know what you are doing before you are allowed to proceed.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            type={"button"}
            className="flex p-2 border border-grey/200 bg-grey/70 rounded-lg"
          >
            <CiSettings size={"1.5rem"} color="#333333" />
          </button>
          <span className="flex font-bold text-[0.875rem] text-grey/700 my-auto">
            Additional settings
          </span>
        </div>

        <div className="flex gap-2 px-2">
          <input
            checked={agreed}
            onChange={() => setAgreed(!agreed)}
            id="migationConsent"
            type={"checkbox"}
          />
          <label htmlFor="migationConsent">
            <span className="flex text-grey/700 text-[0.875rem]">
              I agree to the token migration settings.
            </span>
          </label>
        </div>
      </div>

      <div className="flex justify-between gap-6">
        <Button onclick={handlePrev} text={"Previous"} arrow={"backward"} />
        <Button
          onclick={handleNext}
          text={"Next"}
          loading={btnLoading}
          color="green"
          disabled={!agreed}
        />
      </div>
    </FormContainer>
  );
}
