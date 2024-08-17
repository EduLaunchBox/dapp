import Image from "next/image";
import TableContainer from "../components/tableContainer";
import firstPlace from "../assets/images/firstPlace.png";
import secondPlace from "../assets/images/secondPlace.png";
import thirdPlace from "../assets/images/thirdPlace.png";
import BannerContainer from "../components/bannerContainer";
import Link from "next/link";

export default function Airdrop() {
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
          " flex w-full justify-between gap-4 py-1.5 pl-3 max-lg:pr-28 pr-40"
        }
      >
        <td className={" flex my-auto gap-4 min-w-[6rem] "}>
          <span className="flex w-full gap-3">
            {rank < 4 ? (
              <Image
                className="flex w-12 h-12 rounded-lg object-fit my-auto"
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
                " flex leading-none my-auto font-extrabold"
              }
            >
              {rank}
            </span>
          </span>
        </td>
        <td className="flex my-auto min-w-[8rem]">
          <span className="flex text-[0.875rem] text-grey/700 font-extrabold">
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
              " flex w-full my-auto text-[0.875rem] font-black"
            }
          >
            {points}
          </span>
        </td>
      </tr>
    );
  };

  return (
    <section className="flex max-md:px-8 max-sm:px-6 max-xs:px-4 px-10 py-6 ">
      <div className="flex flex-col gap-6 w-full">
        <BannerContainer>
          <div className="flex w-full h-full gap-4 py-4 max-ld:px-4 px-6">
            <div className="flex flex-col my-auto">
              <h1 className="flex text-grey/50 max-ld:text-[1.25rem] text-[1.75rem] font-extrabold">
                Airdrop
              </h1>
              <span className="flex w-56 text-grey/50 max-lg:text-[0.75rem] text-[0.875rem] text-pretty font-medium">
                Interact with tokens Created and Migrated into EDUCHAIN to rank
                up.
              </span>
            </div>

            <div className="flex gap-2 py-4">
              <div className="flex px-8 justify-center rounded-xl flex-col border-grey/50/25 border bg-grey/50/5">
                <span className="flex mx-auto font-bold text-grey/50 max-lg:text-[0.75rem] text-[0.875rem]">
                  Box Points earned
                </span>
                <span className="flex max-lg:text-[1.25rem] text-[1.75rem] text-secondary/500 font-extrabold mx-auto">
                  0.00 EP
                </span>
              </div>
              <div className="flex px-8 justify-center rounded-xl flex-col border-grey/50/25 border bg-grey/50/5">
                <span className="flex mx-auto font-bold text-grey/50 max-lg:text-[0.75rem] text-[0.875rem]">
                  Your rank
                </span>
                <span className="flex max-lg:text-[1.25rem] text-[1.75rem] text-secondary/500 font-extrabold mx-auto">
                  26,038
                </span>
              </div>
              <div className="flex px-8 justify-center rounded-xl flex-col border-grey/50/25 border gap-1 bg-grey/50/5">
                <h4 className="flex font-extrabold text-grey/50 max-lg:text-[0.75rem] text-[0.875rem]">
                  How to earn points
                </h4>
                <span className="flex flex-col text-grey/50 max-lg:text-[0.75rem] text-[0.875rem]">
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
          <TableContainer className="flex w-full" title="Ranking">
            <table className="flex flex-col w-full">
              <thead className="flex w-full border-b border-primary/100 py-3 pl-6 text-grey/700 max-lg:pr-32 pr-44">
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
                {[
                  {
                    rank: 1,
                    userAddress: "0x742......4438",
                    points: "23,000,000 EP",
                  },
                  {
                    rank: 2,
                    userAddress: "0x742......4438",
                    points: "23,000,000 EP",
                  },
                  {
                    rank: 3,
                    userAddress: "0x742......4438",
                    points: "23,000,000 EP",
                  },
                  {
                    rank: 4,
                    userAddress: "0x742......4438",
                    points: "23,000,000 EP",
                  },
                  {
                    rank: 5,
                    userAddress: "0x742......4438",
                    points: "23,000,000 EP",
                  },
                  {
                    rank: 6,
                    userAddress: "0x742......4438",
                    points: "23,000,000 EP",
                  },
                  {
                    rank: 7,
                    userAddress: "0x742......4438",
                    points: "23,000,000 EP",
                  },
                  {
                    rank: 8,
                    userAddress: "0x742......4438",
                    points: "23,000,000 EP",
                  },
                  {
                    rank: 9,
                    userAddress: "0x742......4438",
                    points: "23,000,000 EP",
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
