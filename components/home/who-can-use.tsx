import { Camera, Mic, Video, Youtube } from "lucide-react";

const users = [
  {
    icon: <Youtube className="h-8 w-8 text-orange-600" />,
    title: "Content Creators",
    description:
      "Transform your YouTube videos into engaging blog posts to reach a wider audience",
  },
  {
    icon: <Mic className="h-8 w-8 text-orange-600" />,
    title: "Podcasters",
    description:
      "Convert your podcast episodes into SEO-friendly articles to boost your online presence",
  },
  {
    icon: <Video className="h-8 w-8 text-orange-600" />,
    title: "Course Creators",
    description:
      "Turn your video lessons into comprehensive written content for your students",
  },
  {
    icon: <Camera className="h-8 w-8 text-orange-600" />,
    title: "Social Media Influencers",
    description:
      "Repurpose your video content into blog posts to maximize your reach",
  },
];

export default function WhoCanUse() {
  return (
    <section className="py-24 bg-orange-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-20">
          <span className="inline-block text-sm font-semibold text-orange-600 bg-orange-50 px-4 py-2 rounded-full">
            Who Can Use
          </span>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-plus-jakarta mb-4">
              Perfect for content creators of all types
            </h2>
            <p className="text-xl text-gray-600">
              Whether you're a YouTuber, podcaster, or course creator, we've got
              you covered
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {users.map((user, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                {user.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 font-plus-jakarta">
                {user.title}
              </h3>
              <p className="text-gray-600">{user.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
