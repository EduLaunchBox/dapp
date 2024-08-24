import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.json();
  const { token, dex, quoteAmount, baseAmount } = data;

  if (!token) {
    throw new Error("Token is required");
  }

  // Find the dex by name
  let dexRecord = null;
  if (dex) {
    dexRecord = await prisma.dex.findFirst({
      where: {
        name: dex,
      },
    });

    // If dex does not exist, create it
    if (!dexRecord) {
      dexRecord = await prisma.dex.create({
        data: {
          name: dex,
        },
      });
    }
  }

  // Check if liquidity for the token already exists
  const existingLiquidity = await prisma.liquidity.findFirst({
    where: {
      tokenId: token?.id,
    },
  });

  if (existingLiquidity) {
    // Update existing liquidity
    const updatedLiquidity = await prisma.liquidity.update({
      where: {
        id: existingLiquidity.id,
      },
      data: {
        dexId: dexRecord?.id,
        quoteAmount: quoteAmount,
        baseAmount: baseAmount,
      },
    });

    return NextResponse.json(
      { message: "Liquidity updated successfully", data: updatedLiquidity },
      { status: 200 }
    );
  } else {
    // Create new liquidity
    const newLiquidity = await prisma.liquidity.create({
      data: {
        tokenId: token?.id,
      },
    });

    return NextResponse.json(
      { message: "Liquidity created successfully", data: newLiquidity },
      { status: 201 }
    );
  }
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const pageSize = Number(url.searchParams.get("pageSize"));
  const page = Number(url.searchParams.get("page"));
  const deployer = url.searchParams.get("deployer");

  if (!deployer) {
    return NextResponse.json(
      { message: "Deployer address is required" },
      { status: 400 }
    );
  }

  // Calculate the offset and limit for pagination
  const offset = (page - 1) * pageSize;
  const limit = pageSize;

  try {
    // Query the liquidities with pagination and filter by deployer
    const liquidities = await prisma.liquidity.findMany({
      skip: offset,
      take: limit,
      include: {
        token: true,
        dex: true,
      },
      where: {
        token: {
          deployerId: deployer,
        },
      },
    });

    // Get the total count of liquidities for pagination metadata, filtered by deployer
    const totalCount = await prisma.liquidity.count({
      where: {
        token: {
          deployerId: deployer,
        },
      },
    });

    return NextResponse.json(
      {
        message: "Liquidity records retrieved successfully",
        data: {
          data: liquidities,
          totalCount,
          currentPage: page,
          totalPages: Math.ceil(totalCount / pageSize),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error retrieving liquidity records" },
      { status: 500 }
    );
  }
}
