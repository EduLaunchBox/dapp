"use client";
import { Button, ToggleButton } from "@/app/components/buttons";
import FormContainer from "@/app/components/formContainer";
import { SelectInput } from "@/app/components/inputsBoxes";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import eduLogo from "../../assets/images/edu.png";
import uniLogo from "../../assets/images/uni.png";
import { PiPlus } from "react-icons/pi";
import { TwoStepBar } from "@/app/components/progressBar";
import { useAccount, useBalance } from "wagmi";
import { Address, isAddress, parseEther } from "viem";
import { useSearchParams } from "next/navigation";
import { ethers } from "ethers";
import axios from "axios";
import { TokenType } from "@/app/types";
import { ClipLoader } from "react-spinners";
import { getEthersSigner } from "@/app/providers/ethers";
import { config } from "@/app/providers/wagmi/config";
import ERC20Abi from "../../lib/abi/ERC20Abi.json";
import VaultAbi from "../../lib/abi/vaultAbi.json";
import poolFactoryAbi from "../../lib/abi/poolFactoryAbi.json";
import SuccessfullyDeployed from "../popovers/successfullyDeployed";
import { HelperFaucetAbi } from "../../lib/abi/helperFaucetAbi";
import Swal from "sweetalert2";

const nativeToken = process.env.NEXT_PUBLIC_NATIVE_TOKEN as Address;
const vaultContractAddress = process.env.NEXT_PUBLIC_VAULT_CONTRACT as Address;
const sailfishApikey = process.env.NEXT_PUBLIC_SAILFISH_APIKEY as string;
const vpfContract = process.env.NEXT_PUBLIC_VPF_CONTRACT as Address;

export default function AddLiquidityForm({
  formStep,
  tokenAddress,
}: {
  formStep: number;
  tokenAddress?: Address;
}) {
  const [toNotStake, setToNotStake] = useState(false);
  const [baseAmount, setBaseAmount] = useState(0); // Amount of Edu(Native coin) being added as liquidity
  const [qouteAmount, setQouteAmount] = useState(0); // Amount of users token the user is adding for liquidity

  const [quoteTokenAddress, setQuoteTokenAddress] = useState<Address>();
  const searchParams = useSearchParams();
  const [dex, setDex] = useState("Sailfish");

  const [btnLoading, setBtnLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [quoteToken, setQuoteToken] = useState<TokenType>();

  const [tokenLoading, setTokenLoading] = useState<boolean>(true);
  const [tokenApproved, setTokenApproved] = useState(false);
  const [lpAdded, setLpAdded] = useState(false);
  const [lpAddress, setLpAddress] = useState(""); // Actually a transaction hash tho. For when the liquidity is added

  const approveBtnRef = useRef<HTMLButtonElement>(null);
  const { address } = useAccount();
  const baseTokenBal = useBalance({
    address: address,
  });

  const updateLiquidityModel = async () => {
    try {
      const response = await axios.post("/api/liquidity", {
        token: quoteToken,
        dex: dex,
        quoteAmount: qouteAmount.toLocaleString() + " " + quoteToken?.symbol,
        baseAmount:
          baseAmount.toLocaleString() + " " + baseTokenBal?.data?.symbol ||
          "EDU",
      });

      console.table("New Dex Created and Liquidity Updated:", response.data);
    } catch (error) {
      console.error(
        "Error creating new dex and updating liquidity:",
        (error as any).response?.data || (error as any).message
      );
    }
  };

  const updateDex = async () => {
    try {
      const sailFishBaseURl = "https://app.sailfish.finance";
      const response = await fetch(quoteToken?.logoUrl || "");
      const imageBlob = await response.blob();
      const formData = new FormData();

      formData.append("name", quoteToken?.symbol || "");
      formData.append("address", quoteToken?.contract || "");
      formData.append("created_at", new Date().toISOString());
      formData.append("logo", imageBlob, "image.jpg");

      await axios.post(sailFishBaseURl + "/api/tokens", formData, {
        headers: { "x-api-key": sailfishApikey },
      });
    } catch (error) {
      throw new Error("Dex upload failed");
    }
  };

  const handleAddLp = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try {
      event.preventDefault();
      setBtnLoading(true);

      // Define the contract configuration
      const signer = await getEthersSigner(config);
      const vaultContract = new ethers.Contract(
        vaultContractAddress,
        VaultAbi,
        signer
      );

      const helperContract = new ethers.Contract(
        vaultContractAddress,
        HelperFaucetAbi,
        signer
      );
      const pairAddress = await helperContract.getPair(
        nativeToken,
        quoteTokenAddress,
        signer
      );

      const amountAIn = ethers.parseEther(baseAmount.toString()); //EDU
      const amountBIn = ethers.parseEther(qouteAmount.toString()); //UNI
      const contract = new ethers.Contract(vpfContract, poolFactoryAbi, signer);

      const toToken = (addr: string) => {
        return ethers.zeroPadValue(addr, 32);
      };

      if (pairAddress === "0x0000000000000000000000000000000000000000") {
        const trx = await contract.deploy(
          toToken(nativeToken),
          toToken(quoteTokenAddress!)
        );
        await trx.wait();
      }

      const res = await vaultContract.addLiquidity(
        nativeToken,
        quoteTokenAddress,
        false,
        amountAIn,
        amountBIn,
        0,
        0,
        address, //msg.sender
        ethers.MaxUint256,
        {
          value: amountAIn,
        }
      );

      setLpAddress(res.hash);
      setLpAdded(true);

      await updateLiquidityModel();
      await updateDex();
      setShowPopup(true);
      setBtnLoading(false);
    } catch (error) {
      let errorMsg = "Something went wrong. Please try again.";
      if (String(error).includes('reverted: "duplicated token"'))
        errorMsg = "Liquidity has already been added to this token";

      Swal.fire({
        title: "Error!!",
        text: errorMsg,
        icon: "error",
        cancelButtonText: "Okay",
      }).finally(() => setBtnLoading(false));
    }
  };

  const handleApprove = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    try {
      // Define the contract configuration
      if (!qouteAmount || !baseAmount) {
        Swal.fire({
          title: "Error!!",
          text: "Add your Qoute and Base amount for liquidity",
          icon: "error",
          cancelButtonText: "Okay",
        });
        return;
      }

      setBtnLoading(true);
      const signer = await getEthersSigner(config);
      const quoteTokenContract = new ethers.Contract(
        quoteTokenAddress as Address,
        ERC20Abi,
        signer
      );

      const amountBIn = ethers.parseEther(qouteAmount.toString()); //Qoute token
      await quoteTokenContract.approve(vaultContractAddress, amountBIn); //Let Vault spend Qoute token
      setTokenApproved(true);
      setBtnLoading(false);
    } catch (error) {
      Swal.fire({
        title: "Error!!",
        text: "Could not Approve token. Please try again.",
        icon: "error",
        confirmButtonText: "Try Again.",
        cancelButtonText: "Okay",
      })
        .then(({ isConfirmed }) => {
          if (isConfirmed) approveBtnRef?.current?.click();
        })
        .finally(() => setBtnLoading(false));
    }
  };

  // Get token details from db if tokenAddress
  useEffect(() => {
    if (quoteTokenAddress || tokenAddress)
      (async () => {
        try {
          setTokenLoading(true);
          const { data } = await axios.get(
            "/api/tokens?tokenAddress=" + (quoteTokenAddress || tokenAddress)
          );
          setQuoteToken(data.data);
          setTokenLoading(false);
        } catch (error) {
          console.log(error);
          alert("Something went wrong. Check console");
        }
      })();
  }, [quoteTokenAddress, tokenAddress]);

  useEffect(() => {
    if (tokenAddress) {
      setQuoteTokenAddress(tokenAddress);
      return;
    }

    const tempAddress = searchParams.get("tokenAddress");
    if (tempAddress && isAddress(tempAddress)) {
      setQuoteTokenAddress(tempAddress as Address);
      return;
    }
  }, [searchParams, tokenAddress]);

  return (
    <FormContainer
      stateToShow={formStep === -1 ? -1 : 4}
      className="flex w-full p-4 flex-col gap-8"
      currentState={formStep}
    >
      <div className="flex flex-col gap-2 ">
        <h3 className="flex text-[1.2rem] font-bold text-primary/500">
          Add Liquidity
        </h3>
        <div className="flex gap-2 border border-primary/100 bg-primary/50 rounded-lg p-2">
          <div className="flex">
            <span className="flex p-2 my-auto rounded-full bg-primary/100">
              <AiOutlineInfoCircle size={"1.2rem"} color="#637FE3" />
            </span>
          </div>
          <p className="text-wrap text-pretty max-w-[28rem] text-primary/300 text-[0.875rem]">
            <span className="font-bold">Note:</span> Here, you can choose to add
            liquidity to your token immediately after deployment. Adding
            liquidity is crucial for enabling trading on decentralized
            exchanges.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {/* Inputs go here */}
        <SelectInput
          labelName={"Select dex to add liquidity to:"}
          id={"addLiquidity"}
          setValue={setDex}
          helpInfo="Choose the decentralized exchange (DEX) where you want to provide liquidity. SailFish is the default DEX for tokens on EduChain."
        >
          <option value={dex} className="flex gap-2 p-1 text-grey/800">
            {dex}
          </option>
        </SelectInput>

        {tokenLoading ? (
          <div className="flex w-full h-40 justify-center">
            <ClipLoader className="my-auto" color="#254AD0" size={"2.5rem"} />
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-2">
              <span className="flex font-medium text-grey/700 max-sm:text-[0.875rem]">
                Quote Token
              </span>
              <TokenInput
                setValue={setQouteAmount}
                logo={quoteToken?.logoUrl || uniLogo}
                symbol={quoteToken?.symbol || "Nil"}
                balance={quoteToken?.totalSupply || "0.00"}
              />
            </div>

            <div className="flex w-full">
              <PiPlus className="flex mx-auto" />
            </div>

            <div className="flex flex-col gap-2">
              <span className="flex font-medium text-grey/700 max-sm:text-[0.875rem]">
                Base Token
              </span>
              <TokenInput
                setValue={setBaseAmount}
                logo={eduLogo}
                symbol={baseTokenBal?.data?.symbol || "EDU"}
                balance={
                  ((Number(baseTokenBal?.data?.value) || 0) / 10 ** 18).toFixed(
                    4
                  ) || "0.00"
                }
              />
            </div>
          </>
        )}

        <div
          className={
            (!qouteAmount || !baseAmount ? "hidden" : "flex") + " w-full pt-2"
          }
        >
          <PriceAndPool
            quoteSymbol={quoteToken?.symbol || "Nil"}
            baseAmount={baseAmount}
            quoteAmount={qouteAmount}
            baseSymbol={baseTokenBal?.data?.symbol || "EDU"}
          />
        </div>

        <div className="flex w-full">
          <span className="flex max-w-[32rem] text-[0.875rem]">
            LP wil be added to the pool to facilitate swap. LP will also be
            locked for {`{period}`} of time. Unlocks will be impossible until
            the period expires.
          </span>
        </div>

        <div className="flex gap-2">
          {/* Toggle Button here */}
          <ToggleButton
            isTrue={toNotStake}
            onclick={() => setToNotStake(!toNotStake)}
          />
          <span className="flex my-auto text-[0.875rem]">
            Add liquidity only and not stake LP
          </span>
        </div>

        <div className="flex w-full justify-center my-2">
          {/* Approve Token and Add Lp line goes here */}
          <TwoStepBar
            stepOne={{
              name: "Approve Token",
              status: !tokenApproved ? "doing" : "done",
            }}
            stepTwo={{
              name: "Add LP",
              status:
                !tokenApproved && !lpAdded
                  ? "undone"
                  : tokenApproved && !lpAdded
                  ? "doing"
                  : "done",
            }}
          />
        </div>
      </div>

      <div className="flex flex-col justify-between gap-2">
        {qouteAmount > Number(quoteToken?.totalSupply) ||
        parseEther(String(baseAmount)) >
          Number(baseTokenBal.data?.value || "0") ? (
          <Button disabled text={"Insufficient Funds"} color="green" />
        ) : tokenApproved ? (
          <Button
            onclick={handleAddLp}
            text={"Add LP"}
            color="green"
            loading={btnLoading}
          />
        ) : (
          <Button
            customRef={approveBtnRef}
            onclick={handleApprove}
            text={"Approve " + (baseTokenBal?.data?.symbol || "EDU")}
            color="green"
            loading={btnLoading}
          />
        )}
        <Button
          onclick={() => setShowPopup(true)}
          text={"Skip"}
          className="border-none"
        />
      </div>
      <SuccessfullyDeployed
        type={
          searchParams.get("tokenAddress") ? "lp" : lpAdded ? "both" : "token"
        }
        show={showPopup}
        setShow={setShowPopup}
        lpAddress={lpAddress}
        tokenAddress={quoteTokenAddress || ""}
      />
    </FormContainer>
  );
}

const PriceAndPool = ({
  quoteSymbol,
  baseSymbol,
  quoteAmount,
  baseAmount,
}: {
  quoteSymbol: string;
  baseSymbol: string;
  quoteAmount: number;
  baseAmount: number;
}) => {
  return (
    <div className="flex w-full flex-col rounded-3xl border bg-grey/70 border-primary/100">
      <div className="flex w-full border-b border-primary/100 py-2 ">
        <span className="flex mx-auto font-bold max-sm:text-[0.875rem] text-grey/700">
          Price & Pool share
        </span>
      </div>
      <div className="flex justify-around max-sm:text-[0.875rem] py-4">
        <div className="flex flex-col">
          <span className="flex mx-auto text-grey/900 font-bold">
            {(quoteAmount / baseAmount).toFixed(4)}
          </span>
          <span className="flex text-grey/500 font-bold">
            {quoteSymbol} per {baseSymbol}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="flex mx-auto text-grey/900 font-bold">
            {(baseAmount / quoteAmount).toFixed(4)}
          </span>
          <span className="flex text-grey/500 font-bold">
            {baseSymbol} per {quoteSymbol}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="flex mx-auto text-grey/900 font-bold">100%</span>
          <span className="flex text-grey/500 font-bold">Pool share</span>
        </div>
      </div>
    </div>
  );
};

const TokenInput = ({
  logo,
  symbol,
  balance,
  setValue,
}: {
  logo: any;
  symbol: string;
  balance: string;
  setValue: Dispatch<SetStateAction<number>>;
}) => {
  return (
    <div className="flex flex-col w-full bg-grey/70 border border-grey/200 rounded-3xl px-3 py-2">
      <div className="flex w-full gap-2">
        <input
          type={"number"}
          required
          min={0}
          onChange={(event) => setValue(Number(event.target.value))}
          className="flex w-full bg-transparent border-none leading-none outline-none max-sm:text-[1.5rem] text-[2rem] font-medium placeholder-grey/400"
          placeholder="0.00"
        />
        <button className="flex h-fit py-[0.2rem] rounded-full border border-grey/200 bg-grey/100-alt my-auto">
          <Image
            className="flex w-6 h-6 rounded-full object-fit my-auto m-[0.2rem]"
            width={500}
            height={500}
            src={logo}
            alt={symbol}
          />
          <span className="flex uppercase max-sm:text-[0.875rem] font-bold my-auto pr-6 pl-1 text-primary/500">
            {symbol}
          </span>
        </button>
      </div>

      <div className="flex w-full justify-between text-grey/400 max-sm:text-[0.875rem]">
        <span>$0.00</span>
        <div className="flex max-sm:text-[0.875rem] max-sm:gap-2 gap-4">
          <div>
            <span>Balance: </span>
            <span>{balance}</span>
          </div>
          <button className="flex text-grey/700 px-2 font-bold">Max</button>
        </div>
      </div>
    </div>
  );
};
