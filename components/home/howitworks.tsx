import { BrainIcon } from "lucide-react";

export default function HowItWorks() {
  return (
    <section
      className="relative py-36 overflow-hidden bg-gradient-to-br from-white via-amber-50/40 to-orange-50/20"
      id="how-it-works"
    >
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(circle,rgba(255,167,38,0.2)_0,rgba(255,255,255,0)_70%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center space-y-5 mb-24">
          <span className="inline-block text-sm font-semibold text-orange-600 bg-orange-50 px-4 py-2 rounded-full">
            <span className="animate-pulse">✨</span> How It Works
          </span>
          <h3 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Build Your Blog in{" "}
            <span className="text-orange-600 bg-orange-100/50 px-2 py-1 rounded-md">
              Just Three Steps
            </span>
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Transform your ideas into stunning blog posts with ease.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-10 relative">
          {/* Connection Lines */}
          <div className="hidden md:block absolute top-1/3 left-1/6 right-1/6 h-1 bg-gradient-to-r from-transparent via-orange-300/50 to-transparent transform -translate-y-1/2" />

          {/* Step 1 */}
          <div className="relative group z-10">
            <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-500 border border-orange-50 hover:border-orange-200">
              <div className="w-14 h-14 bg-orange-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-orange-100 group-hover:scale-105 transition-all duration-300">
                <span className="text-3xl animate-bounce">🎬</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-3">
                1. Submit Your Media
              </h4>
              <p className="text-gray-600 leading-relaxed">
                Upload your video or audio and let our AI get to work.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative group z-10">
            <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-500 border border-orange-50 hover:border-orange-200">
              <div className="w-14 h-14 bg-orange-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-orange-100 group-hover:scale-105 transition-all duration-300">
                <BrainIcon className="w-7 h-7 text-orange-600 animate-pulse" />
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-3">
                2. Smart Processing
              </h4>
              <p className="text-gray-600 leading-relaxed">
                Our AI crafts a captivating blog post from your content in
                seconds.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative group z-10">
            <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-500 border border-orange-50 hover:border-orange-200">
              <div className="w-14 h-14 bg-orange-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-orange-100 group-hover:scale-105 transition-all duration-300">
                <span className="text-3xl animate-spin-slow">✍️</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-3">
                3. Polish & Share
              </h4>
              <p className="text-gray-600 leading-relaxed">
                Fine-tune your post and publish it to the world.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
