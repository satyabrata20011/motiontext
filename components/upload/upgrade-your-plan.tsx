import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function UpgradeYourPlan() {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-orange-100/20 shadow-lg">
      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center shrink-0">
          <Sparkles className="w-6 h-6 text-orange-600" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900 font-plus-jakarta mb-2">
            Unlock AI-Powered Blog Creation
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Transform your content effortlessly! Upgrade to our{" "}
            <span className="font-medium text-orange-600">Creator</span> or{" "}
            <span className="font-medium text-orange-600">Premium Plan</span> to
            create engaging blog posts using advanced AI technology{" "}
            <span className="inline-block animate-pulse">✨</span>
          </p>
        </div>
      </div>
      <Link href="/#pricing">
        <Button className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-medium h-12">
          Explore Plans
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </Link>
    </div>
  );
}
