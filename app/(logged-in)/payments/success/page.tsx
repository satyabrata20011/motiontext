// app/payment/success/page.tsx (for App Router)
// or pages/payment/success.tsx (for Pages Router)

"use client"; // Remove this line if using Pages Router

import { useEffect } from "react";
import { useRouter } from "next/navigation"; // use 'next/router' for Pages Router
import { Loader2 } from "lucide-react";

export default function PaymentSuccess() {
  const router = useRouter();

  useEffect(() => {
    // Set timeout to redirect after 3 seconds
    const redirectTimer = setTimeout(() => {
      router.push("/dashboard");
    }, 2000);

    // Clean up the timer if component unmounts
    return () => clearTimeout(redirectTimer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-50 to-green-100 p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="flex justify-center">
          <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
            <svg
              className="h-8 w-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
        </div>
        <h2 className="mt-6 text-2xl font-bold text-gray-900">
          Payment Successful!
        </h2>
        <p className="mt-2 text-gray-600">
          Thank you for your payment. Your transaction was successful.
        </p>
        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
          <Loader2 className="animate-spin h-4 w-4" />
          <span>Redirecting to dashboard in 2 seconds...</span>
        </div>
      </div>
    </div>
  );
}
