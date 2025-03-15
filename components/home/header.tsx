import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <Link
      href={href}
      className="transition-all duration-200 text-gray-600 hover:text-orange-600 px-4 py-2 rounded-full hover:bg-orange-50/50"
    >
      {children}
    </Link>
  );
};

export default function Header() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 border-b border-orange-100/20">
      <div className="container flex items-center justify-between px-4 lg:px-8 py-4 mx-auto">
        <div className="flex lg:flex-1">
          <NavLink href="/">
            <span className="flex items-center gap-2 shrink-0">
              <Image
                src="/icon.ico"
                alt="Motion Text logo"
                width={32}
                height={32}
                className="hover:rotate-12 transform transition duration-200 ease-in-out"
              />
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600">
                Motion Text
              </span>
            </span>
          </NavLink>
        </div>

        <div className="hidden lg:flex lg:justify-center gap-2">
          <NavLink href="/#pricing">Pricing</NavLink>
          <SignedIn>
            <NavLink href="/posts">Your Posts</NavLink>
          </SignedIn>
        </div>

        <div className="flex items-center gap-4">
          <SignedIn>
            <NavLink href="/dashboard">Upload a Motion</NavLink>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>

          <SignedOut>
            <SignInButton>
              <button className="px-6 py-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-medium hover:shadow-lg transition-all duration-200 hover:scale-105">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
}
