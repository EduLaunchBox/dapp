"use client";
import { Button } from "@/app/components/buttons";
import FormContainer from "@/app/components/formContainer";
import { Input, SelectInput } from "@/app/components/inputsBoxes";
import { getEthersSigner } from "@/app/providers/ethers";
import { config } from "@/app/providers/wagmi/config";
import { useAppDispatch } from "@/app/store/hooks";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import axios from "axios";
import { ethers } from "ethers";
import { useState } from "react";
import { Address } from "viem";

const basescanApikey = process.env.NEXT_PUBLIC_BASESCAN_APIKEY as string;

export default function VerifyOwnershipForm({
  formStep,
  verificationStep,
  verificationNext,
}: {
  formStep: number;
  verificationStep: number;
  verificationNext: ActionCreatorWithPayload<
    `0x${string}`,
    "migrateToken/verificationNext"
  >;
}) {
  const [network, setNetwork] = useState("");
  const [tokenType, setTokenType] = useState("");
  const [tokenContractAdd, setTokenContractAdd] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  const ETHERSCAN_APIS = {
    baseSepolia: `https://api-sepolia.basescan.org/api?module=contract&action=getcontractcreation&contractaddresses=${tokenContractAdd}&apikey=${basescanApikey}`,
  };

  const dispatch = useAppDispatch();

  const handleSign = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try {
      event.preventDefault();
      setBtnLoading(true);
      const signer = await getEthersSigner(config);
      const { data } = await axios.get(ETHERSCAN_APIS.baseSepolia); // Todo: make more flexible
      const contractCreator = data?.result?.[0]?.contractCreator as string;

      const message = `Verify that I am the creator of the token at address ${tokenContractAdd}`;
      const signature = await signer.signMessage(message);

      // Recover the address from the signature Compare the recovered address with the token creator's address
      const recoveredAddress = ethers.verifyMessage(message, signature);
      const isCreator =
        recoveredAddress.toLowerCase() === contractCreator.toLowerCase();
      if (isCreator) {
        dispatch(verificationNext(tokenContractAdd as Address));
      } else {
        alert("This account did not deploy this token");
      }
      setBtnLoading(false);
    } catch (error) {
      console.log(error);
      setBtnLoading(false);
    }
  };

  return (
    <FormContainer
      stateToShow={verificationStep === 1 ? 1 : 0}
      className="flex w-full p-4 flex-col gap-8"
      currentState={formStep}
    >
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
          <option value={"Ethereum"}>Ethereum (Base Sepolia)</option>
        </SelectInput>
      </div>

      <div className="flex flex-col gap-2 max-sm:pt-1 pt-4 w-full">
        <Button
          onclick={handleSign}
          text={"Sign message"}
          color="green"
          arrow={"forward"}
          loading={btnLoading}
        />
        <span className="flex mx-auto text-grey/700 text-[0.75rem] font-medium">
          Proves that you are the token deployer
        </span>
      </div>
    </FormContainer>
  );
}
