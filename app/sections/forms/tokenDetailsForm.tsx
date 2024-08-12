"use client";

import { Button } from "@/app/components/buttons";
import FormContainer from "@/app/components/formContainer";
import { Input, SelectInput } from "@/app/components/inputsBoxes";
import { useState } from "react";

export default function TokenDetailsForm() {
  const [projectCategory, setProjectCategory] = useState("");
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");

  const [tokenSupply, setTokenSupply] = useState<number>();
  const [decimal, setDecimal] = useState<number>();

  return (
    <FormContainer className="flex w-full p-4 flex-col gap-4" currentState={1}>
      <SelectInput
        id={"projectCategory"}
        setValue={setProjectCategory}
        labelName={"Project Category"}
        value={projectCategory}
      >
        <option disabled value={""}>
          Select category that applies
        </option>
      </SelectInput>

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

      <div className="flex gap-4">
        <Input
          labelName={"Token Supply"}
          id={"totalSupply"}
          placeholder={"10,000,000"}
          inputType="number"
          value={tokenSupply}
          setValue={setTokenSupply}
          className="basis-2/3"
        />

        <Input
          labelName={"Decimals"}
          id={"decimals"}
          placeholder={"18"}
          inputType="number"
          value={decimal}
          setValue={setDecimal}
          className="basis-1/3"
        />
      </div>

      <div className="flex place-self-end pt-4 w-1/2">
        <Button text={"Next"} color="green" arrow={"forward"} />
      </div>
    </FormContainer>
  );
}
