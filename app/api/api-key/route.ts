import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  const { apiKey } = await req.json();

  if (!apiKey)
    return NextResponse.json(
      { message: "API key is required" },
      { status: 400 }
    );

  try {
    // Delete existing key (if any)
    await prisma.sailfishApikey.deleteMany({});

    // Create new key
    const newApiKey = await prisma.sailfishApikey.create({
      data: {
        apiKey,
      },
    });

    return NextResponse.json(
      { message: "API key created successfully", data: newApiKey },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error", error },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const apiKeyModel = await prisma.sailfishApikey.findFirst({
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!apiKeyModel)
      return NextResponse.json(
        { message: "API key not found" },
        { status: 404 }
      );

    return NextResponse.json(
      { message: "API key gotten successfully", data: apiKeyModel },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error", error },
      { status: 500 }
    );
  }
}
