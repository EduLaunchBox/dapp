"use client";
import axios from "axios";
import Image from "next/image";
import TableContainer from "../components/tableContainer";
import { MdOutlineNorthEast } from "react-icons/md";
import { Button } from "../components/buttons";
import logo from "../assets/images/uni-blue.png";
import sailfishLogo from "../assets/images/sailfish.png";
import Link from "next/link";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { LiquidityType } from "../types";
import { shortenAddress } from "../lib/utils";
import { useAccount } from "wagmi";

export default function Liquidity() {
  const [liquidities, setLiquidities] = useState<LiquidityType[]>([]);
  const { address } = useAccount();

  useEffect(() => {
    async function loadLiquidities() {
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

        const { data } = await axios.get("/api/liquidity", {
          params: {
            page: 1,
            pageSize: 1000,
            deployer: address,
          },
        });

        setLiquidities(data?.data?.data);
        console.table(data?.data?.data);
        console.log("Paginated List of Liquidities:", data);
      } catch (error) {
        console.error(
          "Error fetching paginated liquidities:",
          (error as any).response?.data || (error as any).message
        );
        Swal.fire({
          title: "Error",
          text: "Error fetching liquidities",
          icon: "error",
          cancelButtonText: "Okay",
        });
      }
    }

    loadLiquidities();
  }, [address]);

  const TableRow = ({
    token,
    symbol,
    logo,
    address,
    dex,
    dexLogo,
    hasLiquity,
    eduAmt,
    uniAmt,
    worthUsdt,
  }: {
    token: string;
    symbol: string;
    logo: any;
    address: string;
    dex: string;
    dexLogo: any;
    hasLiquity: boolean;
    eduAmt: string;
    uniAmt: string;
    worthUsdt: string;
  }) => {
    return (
      <tr className="flex max-xl:w-fit w-full grow gap-4 py-2">
        <td className="flex my-auto min-w-[12rem] max-w-[12rem]">
          <span className="flex w-full gap-3">
            <Image
              className="flex w-6 h-6 rounded-full object-fit"
              width={500}
              height={500}
              src={logo}
              alt={token}
            />
            <span className="flex text-grey/700 max-lg:text-[0.875rem] truncate font-medium">
              {token}
            </span>
          </span>
        </td>
        <td className="flex my-auto max-lg:min-w-[3rem] min-w-[4rem]">
          <span className="flex max-lg:text-[0.75rem] text-[0.875rem] text-grey/700 font-medium">
            {symbol}
          </span>
        </td>
        <td className="flex my-auto max-lg:min-w-[7rem] min-w-[9rem]">
          <span className="flex gap-2">
            <span className="flex text-grey/700 max-lg:text-[0.75rem] text-[0.875rem] my-auto font-medium">
              {shortenAddress(address)}
            </span>
            <Link
              target={"_blank"}
              href={`https://opencampus-codex.blockscout.com/token/${address}`}
              className="flex cursor-pointer my-auto"
            >
              <MdOutlineNorthEast />
            </Link>
          </span>
        </td>
        <td className="flex my-auto max-lg:min-w-[6rem] min-w-[8rem]">
          <span className="flex w-full gap-2">
            {hasLiquity && (
              <Image
                className="flex w-6 h-6 rounded-full object-fit"
                width={500}
                height={500}
                src={dexLogo}
                alt={dex}
              />
            )}
            <span className="flex text-grey/700 max-lg:text-[0.75rem] text-[0.875rem] font-medium">
              {dex}
            </span>
          </span>
        </td>
        <td className="flex grow my-auto max-xl:w-[12rem] w-full">
          {!hasLiquity && (
            <span className="flex max-lg:text-[0.75rem] text-[0.875rem] text-nowrap font-medium text-grey/700">
              No Liquidity
            </span>
          )}
          {hasLiquity && (
            <span className="flex flex-nowrap max-lg:text-[0.75rem] text-[0.875rem] font-medium text-grey/700 gap-2">
              <span className="text-nowrap">{eduAmt}</span>
              <span className="text-nowrap">+</span>
              <span className="text-nowrap">{uniAmt}</span>
              {/* <span className="text-nowrap">({worthUsdt})</span> */}
            </span>
          )}
        </td>
        <td className="flex my-auto max-lg:min-w-[6rem] min-w-[8rem]">
          <Link
            href={{
              pathname: "/liquidity/add-liquidity",
              query: {
                tokenAddress: address,
              },
            }}
            className="flex w-full my-auto "
          >
            <Button
              text="Add Liquidity"
              color="green"
              className="text-nowrap text-[0.875rem]"
            />
          </Link>
        </td>
      </tr>
    );
  };

  return (
    <section className="flex max-md:px-8 max-sm:px-6 max-xs:px-4 px-10 py-6 ">
      <div className="flex flex-col gap-6 w-full">
        <div className="flex flex-col gap-2">
          <h1 className="flex max-md:text-[1.5rem] text-[2rem] text-grey/800 font-bold">
            Liquidity
          </h1>
          <span className="flex max-md:text-[0.875rem] text-grey-700">
            Liquidity is added to your deployed token Against the EDU tokens. LP
            is added at the rate of 0.002 Per token
          </span>
        </div>

        <div className="flex w-full">
          <TableContainer
            className="flex flex-col w-full max-xl:overflow-x-auto"
            title="Deployed/Migrated tokens"
          >
            {liquidities.length > 0 && (
              <table className="flex flex-col w-full">
                <thead className="flex border-b max-xl:w-fit w-full border-primary/100 py-3 px-6 font-medium text-grey/700">
                  <tr className="flex gap-4 w-full">
                    <th className="flex max-lg:text-[0.875rem] min-w-[12rem]">
                      <span className="flex font-medium text-grey/700 text-nowrap">
                        Token name
                      </span>
                    </th>
                    <th className="flex max-lg:min-w-[3rem] max-lg:text-[0.875rem] min-w-[4rem]">
                      <span className="flex font-medium text-grey/700 text-nowrap">
                        Symbol
                      </span>
                    </th>
                    <th className="flex max-lg:min-w-[7rem] max-lg:text-[0.875rem] min-w-[9rem]">
                      <span className="flex font-medium text-grey/700 text-nowrap">
                        Token address
                      </span>
                    </th>
                    <th className="flex max-lg:min-w-[6rem] max-lg:text-[0.875rem] min-w-[8rem]">
                      <span className="flex font-medium text-grey/700 text-nowrap">
                        DEX
                      </span>
                    </th>
                    <th className="flex max-xl:w-[12rem] max-lg:text-[0.875rem] w-full">
                      <span className="flex font-medium text-grey/700 text-nowrap">
                        Liquidity
                      </span>
                    </th>
                    <th className="flex max-lg:min-w-[6rem] min-w-[8rem] max-lg:text-[0.875rem]">
                      <span className="flex font-medium text-grey/700 text-nowrap">
                        Action
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody className="flex flex-col px-6 py-3">
                  {liquidities?.map((item, index) => {
                    return (
                      <TableRow
                        key={index}
                        token={item.token?.name!}
                        symbol={item.token?.symbol!}
                        logo={item.token?.logoUrl}
                        address={item.token?.contract!}
                        dex={item.dex || "No Dex"}
                        dexLogo={sailfishLogo}
                        hasLiquity={Boolean(item?.baseAmount)}
                        eduAmt={item.baseAmount || ""}
                        uniAmt={item?.quoteAmount || ""}
                        worthUsdt={""}
                      />
                    );
                  })}
                </tbody>
              </table>
            )}
            {liquidities.length === 0 && (
              <div className="flex p-4 font-semibold gap-1 mx-auto text-grey/800">
                <span>This account has no deployed tokens. Check out</span>
                <Link className="text-primary/500" href={"/create-tokens"}>
                  Create Tokens
                </Link>
                <span>to get started</span>
              </div>
            )}
          </TableContainer>
        </div>
      </div>
    </section>
  );
}
