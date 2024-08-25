import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // Query tokens with order by points
    const tokens = await prisma.token.findMany({
      include: {
        category: true,
        Liquidity: true,
      },
      orderBy: {
        points: "desc",
      },
    });

    return NextResponse.json(
      {
        message: "Tokens retrieved successfully",
        data: tokens,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error retrieving tokens" },
      { status: 500 }
    );
  }
}
