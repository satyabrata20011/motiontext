import Image from "next/image";
import Link from "next/link";

export default function AuthHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white/50 backdrop-blur-sm border-b border-orange-100/20">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <Link href="/" className="flex items-center gap-2 w-fit">
          <Image src="/icon.ico" alt="Logo" width={28} height={28} />
          <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600">
            Motion Text
          </span>
        </Link>
      </div>
    </header>
  );
}
