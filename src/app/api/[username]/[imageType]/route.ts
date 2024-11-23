import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../../../../utils/supaBaseClient";

export async function GET(
  req: NextRequest,
  { params }: { params: { username: string; imageType: string } }
) {
  try {
    const { username, imageType } = params;

    if (!username || !imageType) {
      return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
    }

    // Build the file path
    const filePath = `${username}/${imageType}`;
    console.log("Fetching image from path:", filePath);

    // Fetch the image from Supabase Storage
    const { data, error } = await supabase.storage
      .from("profile-images")
      .download(filePath);

    if (error || !data) {
      console.error("Error fetching image:", error?.message || "No data returned");
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    // Convert the binary data to a Buffer
    const buffer = await data.arrayBuffer();

    // Serve the image directly as a binary stream
    return new NextResponse(Buffer.from(buffer), {
      headers: {
        "Content-Type": data.type, // Dynamic content type
        "Cache-Control": "public, max-age=3600", // Optional caching
        "Access-Control-Allow-Origin": "*", // Allow all origins
      },
    });
  } catch (err) {
    console.error("Unexpected error occurred:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
