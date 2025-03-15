import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-24 bg-gradient-to-br from-orange-500 to-amber-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white font-plus-jakarta">
            Ready to transform content?
          </h2>
          <p className="text-xl text-white/90">
            Join thousands of content creators who are already using Motion Text
            to expand their reach
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="default"
              size="lg"
              className="bg-white text-orange-600 hover:bg-orange-50 rounded-full text-lg py-6 px-8"
            >
              <Link href="/dashboard" className="flex items-center gap-2">
                Get Started <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
