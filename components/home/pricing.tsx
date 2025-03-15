import { ArrowRight, CheckIcon } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { plansMap } from "@/lib/constants";
import { Badge } from "../ui/badge";

export default function Pricing() {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-white via-orange-50/30 to-white py-24"
      id="pricing"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-20">
          <span className="inline-block text-sm font-semibold text-orange-600 bg-orange-50 px-4 py-2 rounded-full">
            Pricing
          </span>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-plus-jakarta mb-4">
              Choose the perfect plan for your needs
            </h2>
            <p className="text-xl text-gray-600">
              Start for free, upgrade when you need to scale
            </p>
          </div>
        </div>

        <div className="relative flex justify-center flex-col lg:flex-row items-center lg:items-stretch gap-8">
          {plansMap.map(
            ({ name, price, description, items, id, paymentLink }, idx) => (
              <div className="relative w-full max-w-lg" key={idx}>
                <div
                  className={cn(
                    "relative flex flex-col h-full gap-6 z-10 p-8 rounded-2xl border bg-white/80 backdrop-blur-sm hover:scale-105 transition-all duration-300",
                    id === "pro"
                      ? "border-amber-500 shadow-xl border-2"
                      : "border-orange-200/20 shadow-lg"
                  )}
                >
                  {id === "pro" && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-orange-500">
                      Most Popular
                    </Badge>
                  )}
                  <div>
                    <h3 className="text-2xl font-bold capitalize font-plus-jakarta">
                      {name}
                    </h3>
                    <p className="text-gray-600 mt-2">{description}</p>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold">${price}</span>
                    <span className="text-gray-600">/month</span>
                  </div>
                  <ul className="space-y-4 flex-1">
                    {items.map((item, idx) => (
                      <li className="flex items-start gap-3" key={idx}>
                        <CheckIcon className="h-6 w-6 text-orange-500 flex-shrink-0" />
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant={id === "pro" ? "default" : "outline"}
                    className={cn(
                      "rounded-full py-6 text-lg transition-all duration-200",
                      id === "pro"
                        ? "bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg hover:shadow-xl"
                        : "hover:bg-orange-50 hover:text-orange-600"
                    )}
                  >
                    <Link
                      href={paymentLink}
                      className="flex gap-2 items-center"
                    >
                      Get Started <ArrowRight className="h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
