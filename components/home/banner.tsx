import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

export default function Banner() {
  return (
    <section className="relative w-full min-h-[80vh] flex items-center">
      {/* Enhanced gradient background */}
      <div className="absolute inset-0 w-full h-full -z-10">
        {/* Primary gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-amber-50" />

        {/* Animated gradient overlays */}
        <div className="absolute inset-0 opacity-70">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_var(--tw-gradient-stops))] from-orange-400/20 via-transparent to-transparent animate-blob" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,_var(--tw-gradient-stops))] from-amber-300/20 via-transparent to-transparent animate-blob animation-delay-2000" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_80%,_var(--tw-gradient-stops))] from-rose-300/20 via-transparent to-transparent animate-blob animation-delay-4000" />
        </div>

        {/* Subtle texture overlay */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.08]" />
      </div>

      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-4 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob" />
        <div className="absolute top-1/3 -right-4 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-rose-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="relative space-y-8 text-center px-4 max-w-5xl mx-auto">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              <span className="text-gray-900">Turn Motion to</span>{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-amber-600">
                  Masterpiece
                </span>
                <span className="absolute bottom-0 left-0 w-full h-3 bg-gradient-to-r from-orange-400/40 to-amber-400/40 -z-10 transform -rotate-1" />
              </span>
            </h1>
            <h2 className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Turn Your Videos and Voice Recordings into Captivating,
              SEO-Boosted Blog Posts Instantly with Motion Text!
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              variant="link"
              className="group relative rounded-full px-8 py-7 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold text-lg shadow-lg hover:shadow-2xl transition-all duration-200 hover:scale-105 hover:no-underline"
            >
              <Link href="/#pricing" className="flex gap-2 items-center">
                Get Started{" "}
                <ArrowRight className="group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </Button>
            <Link
              href="https://youtu.be/tvqVN_bZGqQ"
              className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors duration-200 font-medium group"
              target="_blank"
              rel="noopener noreferrer"
            >
              See how it works{" "}
              <ArrowRight
                className="group-hover:translate-x-1 transition-transform duration-200"
                size={18}
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
