import Image from "next/image";
import TableContainer from "../components/tableContainer";
import { MdOutlineNorthEast } from "react-icons/md";
import { Button } from "../components/buttons";
import logo from "../assets/images/uni-blue.png";
import sailfishLogo from "../assets/images/sailfish.png";

export default function Liquidity() {
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
      <tr className="flex w-full gap-4 py-2">
        <td className="flex my-auto min-w-[10rem]">
          <span className="flex w-full gap-3">
            <Image
              className="flex w-6 h-6 rounded-full object-fit"
              src={logo}
              alt={token}
            />
            <span className="flex text-grey/700 font-medium">{token}</span>
          </span>
        </td>
        <td className="flex my-auto min-w-[4rem]">
          <span className="flex text-[0.875rem] text-grey/700 font-medium">
            {symbol}
          </span>
        </td>
        <td className="flex my-auto min-w-[9rem]">
          <span className="flex gap-2">
            <span className="flex text-grey/700 text-[0.875rem] my-auto font-medium">
              {address}
            </span>
            <button className="flex my-auto">
              <MdOutlineNorthEast />
            </button>
          </span>
        </td>
        <td className="flex my-auto min-w-[8rem]">
          <span className="flex w-full gap-2">
            <Image
              className="flex w-6 h-6 rounded-full object-fit"
              src={dexLogo}
              alt={dex}
            />
            <span className="flex text-grey/700 text-[0.875rem] font-medium">
              {dex}
            </span>
          </span>
        </td>
        <td className="flex my-auto w-full">
          {!hasLiquity && (
            <span className="flex text-[0.875rem] font-medium text-grey/700">
              No Liquidity
            </span>
          )}
          {hasLiquity && (
            <span className="flex text-[0.875rem] font-medium text-grey/700 gap-2">
              <span>{eduAmt}</span>
              <span>+</span>
              <span>{uniAmt}</span>
              <span>({worthUsdt})</span>
            </span>
          )}
        </td>
        <td className="flex my-auto min-w-[8rem]">
          <span className="flex w-full my-auto ">
            <Button text="Add Liquidity" color="green" />
          </span>
        </td>
      </tr>
    );
  };

  return (
    <section className="flex px-10 py-6 ">
      <div className="flex flex-col gap-6 w-full">
        <div className="flex flex-col gap-2">
          <h1 className="flex text-[2rem] text-grey/800 font-bold">
            Liquidity
          </h1>
          <span className="flex text-grey-700">
            Liquidity is added to your deployed token Against the EDU tokens. LP
            is added at the rate of 0.002 Per token
          </span>
        </div>

        <div className="flex w-full">
          <TableContainer
            className="flex w-full"
            title="Deployed/Migrated tokens"
          >
            <table className="flex flex-col w-full">
              <thead className="flex w-full border-b border-primary/100 py-3 px-6 font-medium text-grey/700">
                <tr className="flex gap-4 w-full">
                  <th className="flex min-w-[10rem]">
                    <span className="flex font-medium text-grey/700 text-nowrap">
                      Token name + Symbol
                    </span>
                  </th>
                  <th className="flex min-w-[4rem]">
                    <span className="flex font-medium text-grey/700 text-nowrap">
                      Symbol
                    </span>
                  </th>
                  <th className="flex min-w-[9rem]">
                    <span className="flex font-medium text-grey/700 text-nowrap">
                      Token address
                    </span>
                  </th>
                  <th className="flex min-w-[8rem]">
                    <span className="flex font-medium text-grey/700 text-nowrap">
                      DEX
                    </span>
                  </th>
                  <th className="flex w-full">
                    <span className="flex font-medium text-grey/700 text-nowrap">
                      Liquidity
                    </span>
                  </th>
                  <th className="flex min-w-[8rem]">
                    <span className="flex font-medium text-grey/700 text-nowrap">
                      Action
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="flex flex-col px-6 py-3">
                {[
                  {
                    token: "Univeristy",
                    symbol: "UNI",
                    logo: logo,
                    address: "0x742......4438",
                    dex: "Sailfish",
                    dexLogo: sailfishLogo,
                    hasLiquity: false,
                    eduAmt: "25,3836 EDU",
                    uniAmt: "300,374 UNI",
                    worthUsdt: "$8,374",
                  },
                  {
                    token: "Univeristy",
                    symbol: "UNI",
                    logo: logo,
                    address: "0x742......4438",
                    dex: "Sailfish",
                    dexLogo: sailfishLogo,
                    hasLiquity: true,
                    eduAmt: "25,3836 EDU",
                    uniAmt: "300,374 UNI",
                    worthUsdt: "$8,374",
                  },
                  {
                    token: "Univeristy",
                    symbol: "UNI",
                    logo: logo,
                    address: "0x742......4438",
                    dex: "Sailfish",
                    dexLogo: sailfishLogo,
                    hasLiquity: true,
                    eduAmt: "25,3836 EDU",
                    uniAmt: "300,374 UNI",
                    worthUsdt: "$8,374",
                  },
                  {
                    token: "Univeristy",
                    symbol: "UNI",
                    logo: logo,
                    address: "0x742......4438",
                    dex: "Sailfish",
                    dexLogo: sailfishLogo,
                    hasLiquity: false,
                    eduAmt: "25,3836 EDU",
                    uniAmt: "300,374 UNI",
                    worthUsdt: "$8,374",
                  },
                  {
                    token: "Univeristy",
                    symbol: "UNI",
                    logo: logo,
                    address: "0x742......4438",
                    dex: "Sailfish",
                    dexLogo: sailfishLogo,
                    hasLiquity: true,
                    eduAmt: "25,3836 EDU",
                    uniAmt: "300,374 UNI",
                    worthUsdt: "$8,374",
                  },
                  {
                    token: "Univeristy",
                    symbol: "UNI",
                    logo: logo,
                    address: "0x742......4438",
                    dex: "Sailfish",
                    dexLogo: sailfishLogo,
                    hasLiquity: true,
                    eduAmt: "25,3836 EDU",
                    uniAmt: "300,374 UNI",
                    worthUsdt: "$8,374",
                  },
                  {
                    token: "Univeristy",
                    symbol: "UNI",
                    logo: logo,
                    address: "0x742......4438",
                    dex: "Sailfish",
                    dexLogo: sailfishLogo,
                    hasLiquity: true,
                    eduAmt: "25,3836 EDU",
                    uniAmt: "300,374 UNI",
                    worthUsdt: "$8,374",
                  },
                  {
                    token: "Univeristy",
                    symbol: "UNI",
                    logo: logo,
                    address: "0x742......4438",
                    dex: "Sailfish",
                    dexLogo: sailfishLogo,
                    hasLiquity: false,
                    eduAmt: "25,3836 EDU",
                    uniAmt: "300,374 UNI",
                    worthUsdt: "$8,374",
                  },
                  {
                    token: "Univeristy",
                    symbol: "UNI",
                    logo: logo,
                    address: "0x742......4438",
                    dex: "Sailfish",
                    dexLogo: sailfishLogo,
                    hasLiquity: true,
                    eduAmt: "25,3836 EDU",
                    uniAmt: "300,374 UNI",
                    worthUsdt: "$8,374",
                  },
                ].map((item, index) => {
                  return <TableRow key={index} {...item} />;
                })}
              </tbody>
            </table>
          </TableContainer>
        </div>
      </div>
    </section>
  );
}
