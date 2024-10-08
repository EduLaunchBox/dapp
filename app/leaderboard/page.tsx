"use client";
import Image from "next/image";
import TableContainer from "../components/tableContainer";
import defaultLogo from "../assets/images/uni-purple.png";
import Link from "next/link";
import BannerContainer from "../components/bannerContainer";
import { TokenType } from "../types";
import axios from "axios";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useAccount } from "wagmi";
import { stringTruncater } from "../lib/utils";

export default function Leaderboard() {
  const { address } = useAccount();
  const [tokens, setTokens] = useState<TokenType[]>([]);

  useEffect(() => {
    (async () => {
      try {
        if (!address) {
          Swal.fire({
            title: "Error!!",
            text: "Please connect your wallet",
            icon: "error",
            confirmButtonText: "Okay",
          });
          return;
        }

        const { data } = await axios.get("/api/leaderboard");

        setTokens(data?.data);
        console.table(data?.data);
      } catch (error) {
        console.error(
          "Error:",
          (error as any).response?.data || (error as any).message
        );
        Swal.fire({
          title: "Error",
          text: "Error fetching Dapps",
          icon: "error",
          cancelButtonText: "Okay",
        });
      }
    })();
  }, [address]);

  const TableRow = ({
    token,
    xHandle,
    symbol,
    logo,
    type,
    liquidity,
    tokenAddress,
    pointsEarned,
  }: {
    token: string;
    xHandle: string;
    symbol: string;
    logo: any;
    type: string;
    liquidity: string;
    tokenAddress: string;
    pointsEarned: string;
  }) => {
    const [holders, setHolders] = useState<number>(1);

    useEffect(() => {
      const getHolders = async (address: string) => {
        try {
          const { data } = await axios.get(
            `https://opencampus-codex.blockscout.com/api/v2/tokens/${address}/counters`
          );
          setHolders(Number(data.token_holders_count));
        } catch {
          return;
        }
      };
      getHolders(tokenAddress);
    });

    return (
      <tr className="flex w-full max-md:w-fit justify-between max-md:text-[0.875rem] gap-4 py-3">
        <td className="flex my-auto min-w-[15rem]">
          <span className="flex w-full gap-3">
            <Image
              className="flex w-8 h-8 rounded-full object-fit my-auto"
              width={500}
              height={500}
              src={logo || defaultLogo}
              alt={token}
            />
            <div className="flex flex-col gap-0 my-auto">
              <span className="flex text-grey/700 font-medium gap-2">
                <span className="flex text-nowrap font-bold">
                  {stringTruncater(token)}
                </span>
                <span>{symbol}</span>
              </span>
              <Link
                target={"_blank"}
                href={String(xHandle)}
                className="flex leading-none max-md:text-[0.75rem] text-[0.875rem] text-primary/400 font-extrabold"
              >
                {token}
              </Link>
            </div>
          </span>
        </td>
        <td className="flex my-auto min-w-[6rem]">
          <span className="flex max-md:text-[0.75rem] text-[0.875rem] text-grey/700 font-medium">
            {type}
          </span>
        </td>
        <td className="flex my-auto min-w-[9rem]">
          <span className="flex text-grey/700 max-md:text-[0.75rem] text-[0.875rem] my-auto font-medium">
            {liquidity}
          </span>
        </td>
        <td className="flex my-auto min-w-[8rem]">
          <span className="flex text-grey/700 max-md:text-[0.75rem] text-[0.875rem] font-medium">
            {holders}
          </span>
        </td>
        <td className="flex my-auto min-w-[8rem]">
          <span className="flex w-full my-auto max-md:text-[0.75rem] text-[0.875rem] text-secondary/700 font-black">
            {pointsEarned}
          </span>
        </td>
      </tr>
    );
  };

  return (
    <section className="flex max-md:px-8 max-sm:px-6 max-xs:px-4 px-10 py-6 ">
      <div className="flex flex-col gap-6 w-full">
        <BannerContainer>
          <div className="flex max-sm:flex-col w-full h-full max-sm:gap-2 gap-4 py-4 px-6">
            <div className="flex flex-col my-auto">
              <h1 className="flex text-grey/50 max-lg:text-[1.25rem] text-[1.75rem] font-extrabold">
                Leaderboard
              </h1>
              <span className="flex max-sm:w-full max-md:w-44 w-56 text-grey/50 max-lg:text-[0.75rem] text-[0.875rem] text-pretty font-medium">
                Earn points to incentivize your community to engage with your
                Dapp on EDUCHAIN.
              </span>
            </div>

            <div className="flex gap-2 max-xs:flex-col py-4">
              <div className="flex max-xs:w-full max-xs:py-2 max-md:px-10 px-16 justify-center rounded-xl flex-col border-grey/50/25 border bg-grey/50/5">
                <span className="flex mx-auto font-bold text-grey/50 max-lg:text-[0.75rem] text-[0.875rem]">
                  Box Points
                </span>
                <span className="flex max-lg:text-[1.25rem] text-[1.75rem] text-secondary/500 font-extrabold mx-auto">
                  0.00
                </span>
              </div>
              <div className="flex px-8 max-xs:w-full max-xs:py-2 justify-center rounded-xl flex-col border-grey/50/25 border gap-1 bg-grey/50/5">
                <h4 className="flex font-extrabold text-grey/50 max-lg:text-[0.75rem] text-[0.875rem]">
                  How to earn points
                </h4>
                <span className="flex flex-col text-grey/50 max-lg:text-[0.75rem] text-[0.875rem]">
                  <ul className="ml-4 list-disc">
                    <li>Migrate or Create token</li>
                    <li>Add LP, the more the merrier</li>
                    <li>Connect your Dapp to your token.</li>
                  </ul>
                  <Link className="underline" href={""}>
                    See API Docs
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </BannerContainer>

        <div className="flex w-full">
          <TableContainer
            className="flex w-full max-md:overflow-x-auto"
            title="Leaderboard"
          >
            <table className="flex flex-col w-full">
              <thead className="flex w-full max-md:w-fit border-b border-primary/100 py-3 pl-6 font-medium text-grey/700 max-md:text-[0.875rem]  pr-16">
                <tr className="flex gap-4 justify-between w-full">
                  <th className="flex min-w-[15rem]">
                    <span className="flex font-medium text-grey/700 text-nowrap">
                      Token name + Symbol
                    </span>
                  </th>
                  <th className="flex min-w-[6rem]">
                    <span className="flex font-medium text-grey/700 text-nowrap">
                      Type
                    </span>
                  </th>
                  <th className="flex min-w-[9rem]">
                    <span className="flex font-medium text-grey/700 text-nowrap">
                      Liquidity
                    </span>
                  </th>
                  <th className="flex min-w-[8rem]">
                    <span className="flex font-medium text-grey/700 text-nowrap">
                      Holders
                    </span>
                  </th>
                  <th className="flex min-w-[8rem]">
                    <span className="flex font-medium text-grey/700 text-nowrap">
                      Points earned
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="flex flex-col pl-6 py-4 pr-16">
                {tokens.map((item, index) => {
                  console.log(item.Liquidity);

                  return (
                    <TableRow
                      key={index}
                      token={item.name}
                      xHandle={item.xUrl}
                      symbol={item.symbol}
                      logo={item.logoUrl}
                      type={item.category?.name || "Others"}
                      liquidity={item.Liquidity?.[0]?.baseAmount || "0.00 EDU"}
                      pointsEarned={item.points.toLocaleString()}
                      tokenAddress={item.contract}
                    />
                  );
                })}
              </tbody>
            </table>
          </TableContainer>
        </div>
      </div>
    </section>
  );
}
