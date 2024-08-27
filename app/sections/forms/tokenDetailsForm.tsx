"use client";
import { Button } from "@/app/components/buttons";
import FormContainer from "@/app/components/formContainer";
import { Input, SelectInput } from "@/app/components/inputsBoxes";
import { useAppDispatch } from "@/app/store/hooks";
import { TokenDetails } from "@/app/types";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import React, { useState } from "react";
import Swal from "sweetalert2";

export default function TokenDetailsForm({
  formStep,
  nextStep,
}: {
  formStep: number;
  nextStep: ActionCreatorWithPayload<TokenDetails, any>;
}) {
  const [projectCategory, setProjectCategory] = useState("");
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const [tokenSupply, setTokenSupply] = useState<number>();
  const [decimal, setDecimal] = useState<number>(18);
  const dispatch = useAppDispatch();

  const handleNext = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    // Verifications
    let errorMessage: string = "";
    if (projectCategory === "")
      errorMessage = "Please select a project category";
    if (tokenName === "") errorMessage = "Please provide a token name.";
    if (tokenSymbol === "") errorMessage = "Please provide a token symbol.";
    if (!tokenSupply) errorMessage = "Token supply must be greater than 0";
    if (!decimal) errorMessage = "Decimal must be greater than 0.";

    if (errorMessage !== "") {
      Swal.fire({
        title: "Error!!",
        text: errorMessage,
        icon: "error",
        cancelButtonText: "Okay",
      });
      setErrMsg(errorMessage);
      return;
    }

    // Save in redux
    dispatch(
      nextStep({
        projectCategory,
        tokenName,
        tokenSymbol,
        tokenSupply: Number(tokenSupply),
        decimal: Number(decimal),
      })
    );
  };

  return (
    <FormContainer
      stateToShow={1}
      className="flex w-full p-4 flex-col gap-4"
      currentState={formStep}
    >
      <SelectInput
        id={"projectCategory"}
        setValue={setProjectCategory}
        labelName={"Project Category"}
        value={projectCategory}
        helpInfo="Select the category that best describes your project’s focus or industry (e.g., Education, Finance, Gaming). This helps in classifying and discovering your token within the ecosystem."
      >
        <option disabled value={""}>
          Select category that applies
        </option>
        {[
          "RWA",
          "Meme",
          "Defi",
          "Infra",
          "Depin",
          "NFT",
          "Gaming",
          "AI",
          "Social",
          "Public Good",
          "Others",
        ].map((item) => {
          return (
            <option value={item} key={item}>
              {item}
            </option>
          );
        })}
      </SelectInput>

      <Input
        labelName={"Token Name"}
        id={"tokenName"}
        placeholder={"Enter name of Token in full"}
        value={tokenName}
        setValue={setTokenName}
        helpInfo='This is the full name of your token (e.g., "EduToken"). Choose a name that reflects your project’s purpose and is easy to remember.'
      />

      <Input
        labelName={"Token Symbol"}
        id={"tokenSymbol"}
        placeholder={"Enter token abbreviations"}
        value={tokenSymbol}
        setValue={setTokenSymbol}
        helpInfo='The symbol is a short, unique identifier for your token (e.g., "EDU"). It typically consists of 3-5 uppercase letters.'
      />

      <div className="flex gap-4">
        <Input
          labelName={"Token Supply"}
          id={"totalSupply"}
          placeholder={"10,000,000"}
          inputType="number"
          value={tokenSupply}
          setValue={setTokenSupply}
          className="basis-2/3"
          helpInfo="This is the total number of tokens that will be created. Consider the tokenomics of your project when deciding on the supply."
        />

        <Input
          labelName={"Decimals"}
          id={"decimals"}
          placeholder={"18"}
          inputType="number"
          value={decimal}
          setValue={setDecimal}
          className="basis-1/3"
          helpInfo="Decimals determine how divisible your token is. For example, if set to 18, your token can be divided down to 18 decimal places, similar to how ETH works."
        />
      </div>

      <div className="flex place-self-end pt-4 w-1/2">
        <Button
          onclick={handleNext}
          text={"Next"}
          color="green"
          arrow={"forward"}
        />
      </div>
    </FormContainer>
  );
}
