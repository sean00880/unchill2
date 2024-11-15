// src/app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Image from 'next/image';

interface BlogPostProps {
  params: { slug: string };
}

export default function BlogPost({ params }: BlogPostProps) {
  const { slug } = params;

  const posts = [
    {
      title: 'How MemeLinked Integrates DeFi and Social Networking',
      href: 'defi-social-networking',
      content: (
        <>
          <div className="ml-[26%] mt-[10vh] p-6 glassmorphism rounded-xl shadow-2xl backdrop-blur-lg transition-transform hover:shadow-glow">
            <h1 className="text-5xl font-extrabold mb-4 text-white">How MemeLinked Integrates DeFi and Social Networking</h1>
            <p className="text-lg mb-6 text-gray-200">
              MemeLinked is pioneering a new frontier by merging decentralized finance (DeFi) with the power of social
              networking. The platform is designed to create a dynamic ecosystem where DeFi enthusiasts and experts can
              connect, engage, and leverage financial tools in a collaborative and innovative environment.
            </p>

            <div className="flex gap-6 items-start">
              <div className="relative overflow-hidden flex-shrink-0">
                <Image
                  src="/images/default_logo.jpg"
                  alt="DeFi and Social Networking"
                  width={500}
                  height={400}
                  className="rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-500"
                  style={{ boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)' }}
                />
              </div>
              <div className="flex-1">
                <h3 className="text-3xl font-semibold mb-4 text-white">Key Features of MemeLinked:</h3>
                <ol className="list-none space-y-4 text-gray-200 text-lg">
                  <li>
                    <strong>Social Feed:</strong> A centralized hub where users can share updates, news, and engage with DeFi
                    content tailored to their interests.
                  </li>
                  <li>
                    <strong>Influencer and Profile Trending:</strong> Gain visibility and credibility through trending metrics that highlight influential users and profiles.
                  </li>
                  <li>
                    <strong>Advertising Tools:</strong> Targeted advertising options designed specifically for DeFi projects, allowing projects to reach their ideal audience.
                  </li>
                  <li>
                    <strong>Community Discussions:</strong> Real-time discussion boards and chat options to foster meaningful conversations and information sharing.
                  </li>
                  <li>
                    <strong>Portfolio Showcases:</strong> Display investment portfolios and share insights, building a network of trust and expertise.
                  </li>
                </ol>
              </div>
            </div>

            <p className="text-lg mt-6 text-gray-200">
              By integrating social features and financial tools, MemeLinked enables users to experience DeFi in an
              interactive and engaging way. This synergy of social networking and DeFi tools empowers users to stay informed,
              collaborate with others, and benefit from the full potential of decentralized finance.
            </p>

            <div className="relative overflow-hidden mt-8 mb-8 flex flex-row">
              <div>
                <h3 className="text-3xl font-semibold mt-8 mb-4 text-white">Why MemeLinked Stands Out in the DeFi Space</h3>
                <p className="text-lg text-gray-200 mb-6">
                  MemeLinked's focus on creating a comprehensive social-financial ecosystem sets it apart from other DeFi platforms.
                  By blending social interaction with financial empowerment, MemeLinked fosters a unique environment that:
                </p>
                <ol className="list-disc ml-8 text-gray-200 text-lg space-y-2">
                  <li><strong>Promotes Collaborative Learning:</strong> Users learn from each other through shared experiences and insights.</li>
                  <li><strong>Facilitates Expert Networking:</strong> Connect with industry leaders and influencers who actively contribute to discussions and project promotions.</li>
                  <li><strong>Supports Grassroots Growth:</strong> Encourages grassroots participation through meme contests, community events, and social challenges.</li>
                </ol>
              </div>
              <Image
                src="/images/default_logo.jpg"
                alt="Community Discussions"
                width={500}
                height={400}
                className="rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-500"
                style={{ boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)' }}
              />
            </div>

            <div className="relative overflow-hidden mt-8">
              <Image
                src="/images/default_logo.jpg"
                alt="Expert Networking"
                width={500}
                height={400}
                className="rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-500"
                style={{ boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)' }}
              />
            </div>

            <h3 className="text-3xl font-semibold mt-8 mb-4 text-white">The Future of MemeLinked</h3>
            <p className="text-lg text-gray-200">
              MemeLinked's roadmap includes enhanced social features, deeper DeFi tool integration, and strategic partnerships
              aimed at expanding the platform's user base and capabilities. Upcoming features include:
            </p>
            <ol className="list-disc ml-8 text-gray-200 text-lg space-y-2">
              <li><strong>Advanced Analytics:</strong> Insights and data visualization tools for monitoring DeFi trends and user activity.</li>
              <li><strong>Customizable Portfolios:</strong> Options for users to create personalized investment portfolios and share them with followers.</li>
              <li><strong>Cross-Platform Integrations:</strong> Seamless integration with other blockchain and DeFi platforms to provide a more comprehensive user experience.</li>
            </ol>

            <p className="text-lg mt-6 text-gray-200">
              As the DeFi landscape evolves, MemeLinked remains committed to adapting and enhancing its offerings to meet the
              needs of its community. The platform's dedication to merging social interaction with financial growth positions it
              as a leader in the DeFi space, promising a future where finance is not just transactional but communal and engaging.
            </p>
          </div>
        </>
      ),
    },
    // Add other posts here with similar structure and extended content...
  ];


  const postContent = posts.find((post) => post.href === slug);

  if (!postContent) {
    notFound(); // Redirects to the 404 page if the post is not found
  }


  return (
    <div className="p-4">
      {postContent ? (
        postContent.content
      ) : (
        <p className="text-center text-red-500">Post not found.</p>
      )}
    </div>
  );
}
