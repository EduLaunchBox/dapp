"use client";
import { FiPlusCircle } from "react-icons/fi";
import { HiOutlineArrowCircleDown } from "react-icons/hi";
import etheriumLogo from "./assets/images/etherium.png";
import bnbLogo from "./assets/images/bnb.png";
import solanaLogo from "./assets/images/solana.png";
import polygonLogo from "./assets/images/polygon.png";
import Image from "next/image";
import { BsArrowDown } from "react-icons/bs";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const ActionCard = ({ action }: { action: "create" | "migrate" }) => {
    const actionAttr = {
      create: {
        title: "Create Token & Liquidity",
        text: "Deploy token for your community on EDUCHAIN in 3 simple steps. tokens are EVM compatible and can be migrated to any ecosystem",
      },
      migrate: {
        title: "Migrate Token, Holders & Liquidity",
        text: "Migrate already deployed tokens from other chains to the EDUCHAIN. Access hands on tools to manage tokens and incentivize your communities",
      },
    };

    return (
      <button
        onClick={() =>
          router.push(
            action === "create" ? "/create-tokens" : "/migrate-tokens"
          )
        }
        className={
          (action === "create"
            ? "text-grey/50 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[#4FA2EB] to-[#274ACC]"
            : "text-grey/700 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#2F2F2F]/5 from-16% via-[#ffffff]/5 to-grey/50 to-[22%] ") +
          "  h-40 max-w-[30rem] relative flex flex-col gap-2 rounded-xl px-8 pt-4 basis-1/2 drop-shadow"
        }
      >
        <div className="flex gap-2">
          {action === "create" ? (
            <FiPlusCircle size={"1.75rem"} className="my-auto" />
          ) : (
            <HiOutlineArrowCircleDown size={"1.75rem"} className="my-auto" />
          )}
          <span className="flex text-[1.5rem] my-auto font-bold">
            {actionAttr[action].title}
          </span>
        </div>
        <span className="flex text-pretty text-left text-[0.875rem]">
          {actionAttr[action].text}
        </span>
      </button>
    );
  };

  const SupportedChainCard = ({
    logo,
    chain,
    live,
  }: {
    logo: any;
    chain: string;
    live?: boolean;
  }) => {
    return (
      <div className="flex text-grey/800 max-w-[15rem] flex-col gap-2 p-3 rounded-xl bg-grey/50 drop-shadow">
        <div className="flex justify-between w-full">
          <div className="flex gap-2">
            <Image
              className="w-8 h-8 my-auto object-fit rounded-lg"
              src={logo}
              alt={chain}
            />
            <span className="flex my-auto text-primary/300 font-bold">
              {chain}
            </span>
          </div>
          <span
            className={
              (live
                ? "text-green bg-light-green/30 "
                : "text-brown bg-light-brown/30 ") +
              " flex font-medium text-[0.75rem] rounded-2xl h-6 px-3 my-auto"
            }
          >
            <span className="my-auto mx-auto">
              {live ? "Live" : "Coming soon"}
            </span>
          </span>
        </div>
        <span className="flex w-56 text-[0.875rem]">
          Migrate your token, holders and liquidity from {chain}
        </span>
      </div>
    );
  };

  const FAQDropdown = ({ question }: { question: string }) => {
    return (
      <div className="flex max-w-[61.5rem] flex-col ">
        <button className="flex w-full justify-between bg-grey/50 py-3 px-4 border border-grey/200 text-[1rem] rounded-lg ">
          <span className="font-medium flex my-auto">{question}</span>
          <span className="flex my-auto">
            <BsArrowDown />
          </span>
        </button>
      </div>
    );
  };

  return (
    <section className="flex px-10 py-6 flex-col gap-8">
      {/* CTAs */}
      <div className="flex text-grey/700 flex-col gap-6">
        <div className="flex flex-col font-medium">
          <h1 className="text-[2rem] font-bold">
            Migrate Token, Holders and Liquidity to EDUCHAIN.
          </h1>
          <span className="">With community incentive included</span>
        </div>
        <div className="flex gap-5">
          <ActionCard action={"create"} />
          <ActionCard action={"migrate"} />
        </div>
      </div>

      {/* Supported Chains */}
      <div className="flex text-grey/700 flex-col gap-4">
        <div className="flex flex-col">
          <h2 className="text-[1.5rem] font-bold">Supported chains</h2>
          <span className="">
            Migrate into EDUCHAIN from any of the chains listed below.
          </span>
        </div>
        <div className="flex gap-2">
          <SupportedChainCard logo={etheriumLogo} chain="Etherium" live />
          <SupportedChainCard logo={bnbLogo} chain="BNB Chain" />
          <SupportedChainCard logo={solanaLogo} chain="Solana" />
          <SupportedChainCard logo={polygonLogo} chain="Polygon" />
        </div>
      </div>

      {/* FAQs */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <h2 className="text-[1.5rem] font-bold">FAQs</h2>
          <span className="">
            Here are some of our most asked questions and their answers
          </span>
        </div>
        <div className="flex flex-col gap-2 max-h-[20rem] overflow-y-auto">
          <FAQDropdown question="How old is Edulaunch?" />
          <FAQDropdown question="Why should I use EDUlaunchBox" />
          <FAQDropdown question="What are the Fees?" />
          <FAQDropdown question="My Chain is not supported yet" />
        </div>
      </div>
    </section>
  );
}
