import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
        name: data.network,
        chainId: 1,
      },
    });
    if (!network)
      network = await prisma.network.create({
        data: {
          name: data.network,
          chainId: 1,
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
      { error: "Failed to upload image" },
      { status: 500 }
    );
  }
}
