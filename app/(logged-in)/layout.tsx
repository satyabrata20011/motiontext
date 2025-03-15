import AuthHeader from "@/components/auth/auth-header";
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
      <AuthHeader />
      <div className="mx-auto px-4">{children}</div>
    </div>
  );
}
