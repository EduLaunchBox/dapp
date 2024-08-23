import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Get or create category
    let category = await prisma.projectCategory.findFirst({
      where: { name: data.projectCategory },
    });
    if (!category)
      category = await prisma.projectCategory.create({
        data: {
          name: data.projectCategory,
        },
      });

    // Get or create network
    let network = await prisma.network.findFirst({
      where: {
        name: data.network?.name,
      },
    });
    if (!network)
      network = await prisma.network.create({
        data: {
          name: data.network?.name,
          chainId: data?.network?.chainId || null,
          explorerUrl: data?.network?.explorerUrl || null,
          logoUrl: data?.network?.logoUrl || null,
        },
      });

    // Get or create user
    let deployer = await prisma.user.findFirst({
      where: { address: data.deployer },
    });
    if (!deployer)
      deployer = await prisma.user.create({
        data: {
          address: data.deployer,
          points: 0,
        },
      });

    // Create token
    const newToken = await prisma.token.create({
      data: {
        name: data.tokenName,
        symbol: data.tokenSymbol,
        totalSupply: String(data.tokenSupply),
        decimal: data.decimal,
        logoUrl: data.logoUrl,
        xUrl: data.xUrl,
        contract: data.contract,
        points: 0,
        categoryId: category.id,
        networkId: network.id,
        deployerId: deployer.address,
      },
    });

    return NextResponse.json(
      { message: "Token Created Successfully", data: newToken },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to create token" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const tokenAddress = url.searchParams.get("tokenAddress");
    if (!tokenAddress)
      return NextResponse.json(
        { error: "No token Address Passed" },
        { status: 400 }
      );

    // Get token
    let token = await prisma.token.findFirst({
      where: {
        contract: tokenAddress,
      },
    });
    return NextResponse.json(
      { message: "Token gotten successfully", data: token },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Failed to get token" }, { status: 500 });
  }
}
