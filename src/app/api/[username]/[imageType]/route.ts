import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../../../../utils/supaBaseClient";

export async function GET(
  req: NextRequest,
  context: { params: { username?: string; imageType?: string } }
) {
  console.log("Request received:", req.url);

  const { username, imageType } = context.params;
  console.log("Extracted params:", { username, imageType });

  if (!username || !imageType) {
    console.error("Invalid parameters:", { username, imageType });
    return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
  }

  // Supported file types
  const supportedFileTypes = ["png", "jpeg", "jpg", "gif", "webp"];
  let fileType: string | undefined;
  let filePath: string | undefined;

  try {
    // Dynamically check for file existence
    for (const type of supportedFileTypes) {
      const path = `${username}/${imageType}.${type}`;
      console.log(`Checking file: ${path}`);
      const { error } = await supabase.storage.from("profile-images").download(path);

      if (!error) {
        fileType = type;
        filePath = path;
        console.log("File found:", { fileType, filePath });
        break;
      } else {
        console.warn(`File not found for type ${type}:`, error.message);
      }
    }

    if (!fileType || !filePath) {
      console.error("No matching file found for the provided username and imageType.");
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    // Download the file
    console.log("Attempting to download file:", filePath);
    const { data, error } = await supabase.storage.from("profile-images").download(filePath);

    if (error || !data) {
      console.error("Error downloading file:", error?.message || "No data returned");
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    // Convert the response to a binary stream
    const buffer = await data.arrayBuffer();
    console.log("File downloaded successfully. Returning response...");

    return new NextResponse(Buffer.from(buffer), {
      headers: {
        "Content-Type": `image/${fileType}`,
        "Cache-Control": "public, max-age=3600", // Optional caching
        "Access-Control-Allow-Origin": "*", // Allow all origins
      },
    });
  } catch (err) {
    console.error("Unexpected error occurred:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
