"use client";
import Image from "next/image";
import TableContainer from "../components/tableContainer";
import firstPlace from "../assets/images/firstPlace.png";
import secondPlace from "../assets/images/secondPlace.png";
import thirdPlace from "../assets/images/thirdPlace.png";
import BannerContainer from "../components/bannerContainer";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import Swal from "sweetalert2";
import axios from "axios";
import { UserType } from "../types";
import { Address } from "viem";
import { shortenAddress } from "../lib/utils";

export default function Airdrop() {
  const { address } = useAccount();
  const [users, setUsers] = useState<UserType[]>([]);
  const [currentUserPoints, setCurrentUserPoints] = useState<string>("0.00");
  const [currentUserRank, setCurrentUserRank] = useState<number>(0);

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

        const { data } = await axios.get("/api/airdrop");

        setUsers(data?.data);
        console.table(data?.data);
      } catch (error) {
        console.error(
          "Error:",
          (error as any).response?.data || (error as any).message
        );
        Swal.fire({
          title: "Error",
          text: "Error fetching users",
          icon: "error",
          cancelButtonText: "Okay",
        });
      }
    })();
  }, [address]);

  useEffect(() => {
    users.forEach((user, index) => {
      if (user.address === address) {
        setCurrentUserPoints(user.points?.toLocaleString() || "0.00");
        setCurrentUserRank(index + 1);
      }
    });
  }, [address, users]);

  const TableRow = ({
    rank,
    userAddress,
    points,
  }: {
    rank: number;
    userAddress: string;
    points: string;
  }) => {
    return (
      <tr
        className={
          (rank === 1
            ? "border border-firstPlace bg-firstPlace/30 rounded-2xl"
            : rank === 2
            ? "border border-secondPlace bg-secondPlace/30 rounded-2xl"
            : rank === 3
            ? "border border-thirdPlace bg-thirdPlace/30 rounded-2xl"
            : "") +
          " flex w-full max-sm:w-fit justify-between gap-4 py-1.5 pl-3 max-md:pr-20 max-lg:pr-28 pr-40"
        }
      >
        <td className={" flex my-auto gap-4 min-w-[6rem] "}>
          <span className="flex w-full gap-3">
            {rank < 4 ? (
              <Image
                className="flex max-md:w-10 w-12 max-md:h-10 h-12 rounded-lg object-fit my-auto"
                src={
                  rank === 1
                    ? firstPlace
                    : rank === 2
                    ? secondPlace
                    : thirdPlace
                }
                alt={"position " + rank}
              />
            ) : (
              <span className="flex w-12 h-12 my-auto" />
            )}
            <span
              className={
                (rank === 1
                  ? "text-firstPlace"
                  : rank === 2
                  ? "text-secondPlace"
                  : rank === 3
                  ? "text-thirdPlace"
                  : "text-primary/400 ") +
                " flex max-md:text-[0.875rem] leading-none my-auto font-extrabold"
              }
            >
              {rank}
            </span>
          </span>
        </td>
        <td className="flex my-auto min-w-[8rem]">
          <span className="flex max-md:text-[0.75rem] text-[0.875rem] text-grey/700 font-extrabold">
            {userAddress}
          </span>
        </td>
        <td className="flex my-auto min-w-[10rem]">
          <span
            className={
              (rank === 1
                ? "text-firstPlace"
                : rank === 2
                ? "text-secondPlace"
                : rank === 3
                ? "text-thirdPlace"
                : "text-secondary/700") +
              " flex w-full my-auto max-md:text-[0.75rem] text-[0.875rem] font-black"
            }
          >
            {points} EP
          </span>
        </td>
      </tr>
    );
  };

  return (
    <section className="flex max-md:px-8 max-sm:px-6 max-xs:px-4 px-10 py-6 ">
      <div className="flex flex-col gap-6 w-full">
        <BannerContainer>
          <div className="flex w-full h-full gap-4 py-4 max-xl:px-4 px-6 max-md:flex-col max-md:gap-2">
            <div className="flex flex-col my-auto">
              <h1 className="flex text-grey/50 max-xl:text-[1.25rem] text-[1.75rem] font-extrabold">
                Airdrop
              </h1>
              <span className="flex max-md:w-full max-xl:w-44 w-56 text-grey/50 max-xl:text-[0.75rem] text-[0.875rem] text-pretty font-medium">
                Interact with tokens Created and Migrated into EDUCHAIN to rank
                up.
              </span>
            </div>

            <div className="flex gap-2 py-4 max-sm:flex-wrap">
              <div className="flex max-md:py-2 max-xl:px-6 max-lg:px-4 px-8 justify-center rounded-xl flex-col border-grey/50/25 border bg-grey/50/5">
                <span className="flex mx-auto font-bold text-grey/50 max-xl:text-[0.75rem] text-[0.875rem] text-nowrap">
                  Box Points earned
                </span>
                <span className="flex max-xl:text-[1.25rem] text-[1.75rem] text-secondary/500 font-extrabold mx-auto text-nowrap">
                  {currentUserPoints} EP
                </span>
              </div>
              <div className="flex max-md:py-2 max-lg:px-6 px-8 justify-center rounded-xl flex-col border-grey/50/25 border bg-grey/50/5">
                <span className="flex mx-auto font-bold text-grey/50 max-xl:text-[0.75rem] text-[0.875rem]">
                  Your rank
                </span>
                <span className="flex max-xl:text-[1.25rem] text-[1.75rem] text-secondary/500 font-extrabold mx-auto">
                  {currentUserRank}
                </span>
              </div>
              <div className="flex max-md:py-2 max-sm:w-full max-lg:px-6 px-8 justify-center rounded-xl flex-col border-grey/50/25 border gap-1 bg-grey/50/5">
                <h4 className="flex font-extrabold text-grey/50 max-xl:text-[0.75rem] text-[0.875rem]">
                  How to earn points
                </h4>
                <span className="flex flex-col text-grey/50 max-xl:text-[0.75rem] text-[0.875rem]">
                  <ul className="ml-4 list-disc">
                    <li>Bridge EDU over to EDUCHAIN</li>
                    <li>Use Dapps listed on our Leaderboard</li>
                    <li>Refer others</li>
                  </ul>
                  <Link className="underline" href={""}>
                    See Referal Dashboard
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </BannerContainer>

        <div className="flex w-full">
          <TableContainer
            className="flex w-full max-sm:overflow-x-auto"
            title="Ranking"
          >
            <table className="flex flex-col w-full">
              <thead className="flex w-full max-sm:w-fit border-b border-primary/100 py-3 pl-6 text-grey/700 max-md:pr-24 max-lg:pr-32 pr-44">
                <tr className="flex gap-4 justify-between w-full">
                  <th className="flex min-w-[6rem]">
                    <span className="flex font-semibold text-[0.875rem] text-grey/700 text-nowrap">
                      Rank
                    </span>
                  </th>
                  <th className="flex min-w-[8rem]">
                    <span className="flex font-semibold text-[0.875rem] text-grey/700 text-nowrap">
                      User address
                    </span>
                  </th>
                  <th className="flex px-2 min-w-[10rem]">
                    <span className="flex font-semibold text-[0.875rem] text-grey/700 text-nowrap">
                      point
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="flex flex-col gap-1 px-3 py-4">
                {users.map((item, index) => {
                  return (
                    <TableRow
                      key={index}
                      rank={index + 1}
                      userAddress={shortenAddress(item.address!) as Address}
                      points={item.points?.toLocaleString() || "0.00"}
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
