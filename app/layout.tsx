import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/home/header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";
import { ORIGIN_URL } from "@/lib/constants";
import PageLoader from "@/components/common/page-loader";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Motion Text - Effortlessly Convert Videos and Audio into SEO-Optimized Blog Posts with AI",
  description: "Transform your videos and audio recordings into engaging, SEO-friendly blog posts in seconds with the power of AI.",
  icons: {
    icon: "/icon.ico",
  },
  metadataBase: ORIGIN_URL ? new URL(ORIGIN_URL) : undefined,
  alternates: ORIGIN_URL ? { canonical: ORIGIN_URL } : undefined,
};
console.log("ORIGIN_URL:", ORIGIN_URL);


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${plusJakarta.variable} ${inter.variable}`}>
        <body className="min-h-screen bg-background font-plus-jakarta antialiased">
          <PageLoader />
          <Header></Header>
          <main>{children}</main>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
