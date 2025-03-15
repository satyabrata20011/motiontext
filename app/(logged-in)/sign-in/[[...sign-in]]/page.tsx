import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-amber-50/40 to-orange-50/20">
      <SignIn
        appearance={{
          elements: {
            // Orange gradient button styling
            formButtonPrimary:
              "bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300",
            // Orange link styling for footer actions (e.g., "Sign up" link)
            footerActionLink:
              "text-orange-600 hover:text-orange-700 font-medium",
            // Target the "Secured by Clerk" branding specifically
          },
        }}
      />
    </div>
  );
}
