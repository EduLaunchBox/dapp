import { ethers } from "ethers";
import tokenABI from "../../../lib/abi/ERC20Abi.json";
import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

// Connect to an Ethereum provider
const provider = new ethers.JsonRpcProvider(
  "https://open-campus-codex-sepolia.drpc.org/"
);
const privateKey = process.env.WALLET_PRIVATE_KEY as string; // Replace with your private key
const wallet = new ethers.Wallet(privateKey, provider);

async function performTransfer(
  tokenAddress: string,
  recipientAddress: string,
  tokenOwner: string,
  amount: bigint
) {
  const tokenContract = new ethers.Contract(tokenAddress, tokenABI, wallet);
  const tx = await tokenContract.transferFrom(
    tokenOwner,
    recipientAddress,
    amount
  );

  // Get or create user and assign points
  let user = await prisma.user.findFirst({
    where: { address: recipientAddress },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        address: recipientAddress,
        points: Number(ethers.formatEther(amount)) / 100,
      },
    });
  } else {
    await prisma.user.update({
      where: {
        address: recipientAddress,
      },
      data: {
        points: user.points + Number(ethers.formatEther(amount)) / 100,
      },
    });
  }

  console.log("Transfer transaction sent:", tx.hash);
  return tx.hash;
}

export async function POST(request: Request) {
  const data = await request.json();
  const { tokenAddress, oldTokenAddress, tokenOwner } = data;

  if (!tokenAddress || !oldTokenAddress || !tokenOwner) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    const txHashes: string[] = [];
    const holderCountUrl = `https://base-sepolia.blockscout.com/api/v2/tokens/${oldTokenAddress}/counters`;
    const holdersDataUrl = `https://base-sepolia.blockscout.com/api/v2/tokens/${oldTokenAddress}/holders`;

    const response = await fetch(holderCountUrl);
    const countData = await response.json();
    const holders = Number(countData?.token_holders_count) || 0;

    const holderResponse = await fetch(holdersDataUrl);
    const holderResponseData = await holderResponse.json();
    const holderData = holderResponseData?.items;

    for (let index = 0; index < holderData.length; index++) {
      const holderAddress = holderData[index]?.address?.hash;
      const value = BigInt(holderData[index]?.value);
      console.log(value);
      if (value < 0 || holderAddress === tokenOwner) continue;

      console.table({ tokenAddress, holderAddress, tokenOwner, value });
      const hash = await performTransfer(
        tokenAddress,
        holderAddress,
        tokenOwner,
        value
      );
      txHashes.push(hash);
    }

    return NextResponse.json(
      { message: "Transfer transaction sent", txHash: txHashes },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending transfer transaction:", error);
    return NextResponse.json(
      { error: "Error sending transfer transaction" },
      { status: 500 }
    );
  }
}
