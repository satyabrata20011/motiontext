import BgGradient from "@/components/common/bg-gradient";
import Banner from "@/components/home/banner";
import HowItWorks from "@/components/home/howitworks";
import WhoCanUse from "@/components/home/who-can-use";
import Testimonials from "@/components/home/testimonials";
import Pricing from "@/components/home/pricing";
import CTA from "@/components/home/cta";
import { Dot, Github, Twitter } from "lucide-react";

export default function Home() {
  return (
    <main className="relative mx-auto w-full min-h-screen bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
      <BgGradient />
      <Banner />
      <HowItWorks />
      <WhoCanUse />
      <Pricing />
      <Testimonials />
      <CTA />

      <footer className="bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-gray-600">
                © {new Date().getFullYear()} Motion Text.
              </span>
              <span className="text-gray-600">All rights reserved.</span>
            </div>

            <div className="flex items-center gap-6">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-orange-600 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-orange-600 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <span className="text-gray-600">
                Built by{" "}
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-600 hover:text-orange-700 transition-colors"
                >
                  Naga Nithin
                </a>{" "}
              </span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
