import { NextResponse } from "next/server";
import cloudinary from "@/app/lib/cloudinary";

export async function POST(request: Request) {
  try {
    const { image } = await request.json(); // Get the Base64 string from the request body

    const result = await cloudinary.uploader.upload(image, {
      folder: "EduLaunch", // Optional: Specify a folder in Cloudinary
      upload_preset: "eduLaunch", // Optional: Specify an upload preset
    });

    return NextResponse.json({ url: result.secure_url });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    );
  }
}
