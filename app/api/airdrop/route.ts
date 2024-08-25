import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // Query users order by points
    const users = await prisma.user.findMany({
      orderBy: {
        points: "desc",
      },
    });

    return NextResponse.json(
      {
        message: "Users retrieved successfully",
        data: users,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error retrieving Users" },
      { status: 500 }
    );
  }
}
