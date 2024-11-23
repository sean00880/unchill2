import { getProfileImageUrl } from "../../../utils/imageUtils";
import Image from "next/image";

// Define the async function to handle dynamic params
export default async function UserProfile({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params; // Await the promise to extract `username`

  return (
    <div className="profile-container">
      <h1>{username}&apos;s Profile</h1>
      <div className="images">
        <Image
          src={getProfileImageUrl(username, "profile")}
          alt={`${username}'s Profile`}
          className="profile-image"
          width={600}
          height={200}
        />
        <Image
          src={getProfileImageUrl(username, "banner")}
          alt={`${username}'s Banner`}
          className="banner-image"
          height={150}
          width={150}
        />
      </div>
    </div>
  );
}
