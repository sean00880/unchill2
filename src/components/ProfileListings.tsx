// src/components/ProfileListings.tsx
interface ProfileListingsProps {
    isDarkMode: boolean;
  }
  
  export default function ProfileListings({ isDarkMode }: ProfileListingsProps) {
    // Mock data for profile listings
    const profiles = [
      { name: 'Chris P.', role: 'Animator', description: '2D/3D animation expert.' },
      { name: 'Sam L.', role: 'Artist', description: 'NFT and digital art specialist.' },
    ];
  
    return (
      <section className={`glass p-6 mb-8 rounded-xl ${isDarkMode ? 'bg-opacity-50' : 'bg-opacity-30'} backdrop-blur-md`}>
        <h2 className={`text-2xl mb-4 ${isDarkMode ? 'text-yellow-accent' : 'text-blue-accent'}`}>Profile Listings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {profiles.map((profile, index) => (
            <div key={index} className={`profile-listing p-4 border rounded-lg shadow ${isDarkMode ? 'bg-card-bg-dark' : 'bg-card-bg-light'}`}>
              <h3 className="font-bold text-lg">{profile.name}</h3>
              <p>Role: {profile.role}</p>
              <p>{profile.description}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }
  