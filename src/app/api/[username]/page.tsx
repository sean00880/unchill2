import { getProfileImageUrl } from "../../../utils/imageUtils";
import Image from "next/image";

// Define the structure of dynamic route props
interface UserProfileProps {
  params: { username: string };
}

// Correctly export the component with dynamic route handling
const UserProfile = async ({ params }: UserProfileProps) => {
  const { username } = params;

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
};

export default UserProfile;
