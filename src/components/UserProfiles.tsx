// src/components/UserProfiles.tsx
interface UserProfilesProps {
    isDarkMode: boolean;
  }
  
  export default function UserProfiles({ isDarkMode }: UserProfilesProps) {
    // Mock data for user profiles
    const userProfiles = [
      { name: 'John Doe', role: 'Web Designer', rating: 4.8, badge: 'Gold' },
      { name: 'Jane Smith', role: 'Developer', rating: 4.6, badge: 'Silver' },
      { name: 'Alex Johnson', role: 'Raider', rating: 4.2, badge: 'Bronze' },
    ];
  
    return (
      <section className={`glass p-6 mb-8 rounded-xl ${isDarkMode ? 'bg-opacity-50' : 'bg-opacity-30'} backdrop-blur-md`}>
        <h2 className={`text-2xl mb-4 ${isDarkMode ? 'text-yellow-accent' : 'text-blue-accent'}`}>User Profiles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {userProfiles.map((user, index) => (
            <div key={index} className={`profile-card p-4 border rounded-lg shadow ${isDarkMode ? 'bg-card-bg-dark' : 'bg-card-bg-light'}`}>
              <h3 className="font-bold text-lg">{user.name}</h3>
              <p>{user.role}</p>
              <p>Rating: {user.rating} ⭐</p>
              <p>Badge: {user.badge}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }
  