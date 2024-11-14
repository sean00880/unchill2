// src/app/feed/page.tsx
import SidebarAd from '../../components/SideBarAd';
import Post from '../../components/Post';
import TrendingBar from '@components/TrendingBar';
import GetLinked from '../../components/GetLinked';

const samplePosts = [
  {
    username: 'CryptoKing',
    avatar: '/avatars/cryptoking.png',
    timePosted: '1h ago',
    content: 'Exploring the latest in DeFi. What are your thoughts?',
    isDarkMode: true,
    verified: true,
    media: ['/images/default_logo.jpg', '/images/default_logo.jpg','/images/default_logo.jpg', '/images/default_logo.jpg', '/images/default_logo.jpg'] // Example images
  },
  {
    username: 'JaneCrypto',
    avatar: '/avatars/janecrypto.png',
    timePosted: '2h ago',
    content: 'Just published a new article on the importance of staking!',
    isDarkMode: true,
    verified: false,
    media: ['/images/default_logo.jpg', '/images/default_logo.jpg', '/images/default_logo.jpg', '/images/default_logo.jpg'] // Example images
  }
];

export default function FeedPage({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <div className={`feed-page min-h-screen ${isDarkMode ? 'bg-dark-background text-black' : 'bg-light-background text-white'} font-sans`}>
      <TrendingBar isDarkMode={isDarkMode} />
      <div className="flex">
        {/* Left Ad Sidebar */}
        <SidebarAd position="left" />

        {/* Main Content - Posts & Right Sections */}
        <div className="flex-grow mx-2 grid grid-cols-12 gap-4">
          {/* Main Post Feed (8 columns) */}
          <div className="col-span-8 ">
            {samplePosts.map((post, index) => (
              <Post key={index} {...post} />
            ))}
          </div>

          {/* Right Section with GetLinked and Explore Links (4 columns) */}
          <div className="col-span-4 p-4 border rounded-lg">
            <GetLinked />
            <h3 className="text-lg font-bold mb-2">Explore</h3>
            <ul>
              <li><a href="#" className="text-[gold] hover:underline">Trending Hashtags</a></li>
              <li><a href="#" className="text-[gold] hover:underline">Follow Influencers</a></li>
              <li><a href="#" className="text-[gold] hover:underline">Latest News</a></li>
              <li><a href="#" className="text-[gold] hover:underline">Crypto Tips</a></li>
            </ul>
          </div>
        </div>

        {/* Right Ad Sidebar */}
       
      </div>
    </div>
  );
}
