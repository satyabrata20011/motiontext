import { Quote } from "lucide-react";

const testimonials = [
  {
    content:
      "Motion Text has transformed my content creation process. Converting videos to blog posts is now effortless.",
    author: "Sarah J.",
    role: "YouTuber",
  },
  {
    content:
      "The AI transcription accuracy is impressive. It saves me hours of work every week.",
    author: "Michael C.",
    role: "Course Creator",
  },
  {
    content:
      "Perfect for repurposing my podcast episodes into SEO-friendly blog content.",
    author: "Emma D.",
    role: "Podcast Host",
  },
  {
    content:
      "Game-changer for my content strategy. Now I can reach both video and text audiences.",
    author: "David R.",
    role: "Content Creator",
  },
  {
    content:
      "The blog posts it generates are well-structured and require minimal editing.",
    author: "Lisa M.",
    role: "Digital Marketer",
  },
  {
    content:
      "Helps me maintain consistency in both video and written content effortlessly.",
    author: "James W.",
    role: "Tech Educator",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-gradient-to-b from-white via-orange-50/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <span className="inline-block text-sm font-semibold text-orange-600 bg-orange-50 px-4 py-2 rounded-full">
            Testimonials
          </span>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-plus-jakarta mb-4">
              Loved by content creators worldwide
            </h2>
            <p className="text-xl text-gray-600">
              See what our users have to say about their experience
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="relative bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300 border border-orange-100/50"
            >
              <Quote className="absolute -top-3 -left-3 w-8 h-8 text-orange-500/20" />
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                "{testimonial.content}"
              </p>
              <div>
                <h3 className="text-sm font-semibold font-plus-jakarta text-gray-900">
                  {testimonial.author}
                </h3>
                <p className="text-orange-600/80 text-xs">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
