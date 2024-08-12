"use client";
import { Button } from "@/app/components/buttons";
import FormContainer from "@/app/components/formContainer";
import { Input, SelectInput } from "@/app/components/inputsBoxes";
import { useState } from "react";

export default function VerifyOwnershipForm() {
  const [network, setNetwork] = useState("");
  const [tokenType, setTokenType] = useState("");
  const [tokenContractAdd, setTokenContractAdd] = useState("");

  return (
    <FormContainer className="flex w-full p-4 flex-col gap-8" currentState={1}>
      <div className="flex">
        <span className="flex text-grey/800 font-bold">
          Verify Token Ownership and details
        </span>
      </div>

      <div className="flex flex-col w-full gap-4">
        <Input
          labelName={"Token Contract addresss"}
          id={"tokenContractAddresss"}
          type="paste"
          placeholder={"Enter Token Contract address"}
          value={tokenContractAdd}
          setValue={setTokenContractAdd}
        />

        <SelectInput
          id={"tokenType"}
          setValue={setTokenType}
          labelName={"Token Type"}
          value={tokenType}
        >
          <option value={"ERC20"}>ERC20</option>
        </SelectInput>

        <SelectInput
          id={"network"}
          setValue={setNetwork}
          labelName={"Network"}
          value={network}
        >
          <option value={"Ethereum"}>Ethereum</option>
        </SelectInput>
      </div>

      <div className="flex flex-col gap-2 pt-4 w-full">
        <Button text={"Sign message"} color="green" arrow={"forward"} />
        <span className="flex mx-auto text-grey/700 text-[0.75rem] font-medium">
          Proves that you are the token deployer
        </span>
      </div>
    </FormContainer>
  );
}
