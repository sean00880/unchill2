import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../../../../utils/supaBaseClient";

export async function GET(req: NextRequest) {
  try {
    console.log("Request received:", req.url);

    // Extract parameters
    const pathSegments = req.nextUrl.pathname.split("/").filter(Boolean);
    const username = decodeURIComponent(pathSegments[1]); // `[username]`
    const imageType = decodeURIComponent(pathSegments[2]); // `[imageType]`

    console.log("Extracted params:", { username, imageType });

    if (!username || !imageType) {
      return NextResponse.json(
        { error: "Invalid parameters. Both username and imageType are required." },
        { status: 400 }
      );
    }

    // Fetch the list of files for the user from the Supabase bucket
    const { data: files, error: listError } = await supabase.storage
      .from("profile-images")
      .list(username);

    if (listError || !files) {
      console.error("Error fetching file list from storage:", listError?.message || "No files returned");
      return NextResponse.json(
        { error: "No files found for the specified username in the storage bucket." },
        { status: 404 }
      );
    }

    // Determine the specific file for the imageType
    const targetFile = files.find((file) =>
      file.name.startsWith(imageType)
    );

    if (!targetFile) {
      return NextResponse.json(
        { error: `No file found for type ${imageType} under username ${username}.` },
        { status: 404 }
      );
    }

    const filePath = `${username}/${targetFile.name}`;
    console.log("Resolved file path:", filePath);

    // Fetch the image from Supabase storage
    const { data: fileData, error: fileError } = await supabase.storage
      .from("profile-images")
      .download(filePath);

    if (fileError || !fileData) {
      console.error("Error fetching image from storage:", fileError?.message || "No data returned");
      return NextResponse.json(
        { error: "Image not found in storage. Ensure the file path is correct." },
        { status: 404 }
      );
    }

    console.log("Image successfully fetched from storage:", filePath);

    // Serve the image binary directly
    const buffer = await fileData.arrayBuffer();
    return new NextResponse(Buffer.from(buffer), {
      headers: {
        "Content-Type": fileData.type || "application/octet-stream",
        "Cache-Control": "public, max-age=3600",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json(
      { error: "Internal server error. Unable to fetch the image." },
      { status: 500 }
    );
  }
}
