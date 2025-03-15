"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 bg-white/50 backdrop-blur-sm transition-all duration-300",
        isLoading ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          <div className="h-16 w-16 rounded-full border-2 border-orange-200 border-l-orange-600 animate-spin" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-r-amber-500 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
