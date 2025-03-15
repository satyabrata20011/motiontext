import BgGradient from "@/components/common/bg-gradient";
import { Badge } from "@/components/ui/badge";
import UpgradeYourPlan from "@/components/upload/upgrade-your-plan";
import UploadForm from "@/components/upload/upload-form";
import getDbConnection from "@/lib/db";
import {
  doesUserExist,
  getPlanType,
  hasCancelledSubscription,
  updateUser,
} from "@/lib/user-helpers";
import { currentUser } from "@clerk/nextjs/server";
import { ArrowRight, FileText, Sparkles } from "lucide-react";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  try {
    // ✅ Get the logged-in user
    const clerkUser = await currentUser();
    if (!clerkUser) {
      console.error("User not authenticated");
      return redirect("/sign-in");
    }

    const email = clerkUser?.emailAddresses?.[0]?.emailAddress ?? "";
    if (!email) {
      console.error("User email is missing");
      return redirect("/sign-in");
    }

    // ✅ Establish database connection
    let sql;
    try {
      sql = await getDbConnection();
    } catch (error) {
      console.error("Database connection error:", error);
      return redirect("/error");
    }

    let userId = null;
    let priceId = null;

    try {
      // ✅ Check if user exists and update if needed
      const user = await doesUserExist(sql, email);
      if (user) {
        userId = clerkUser.id;
        if (userId) {
          await updateUser(sql, userId, email);
        }
        priceId = user[0]?.price_id ?? null;
      }
    } catch (error) {
      console.error("Error checking user existence:", error);
    }

    // ✅ Get plan type and set defaults
    const { id: planTypeId = "starter", name: planTypeName = "Starter" } =
      getPlanType(priceId) || {};

    const isBasicPlan = planTypeId === "basic";
    const isProPlan = planTypeId === "pro";

    let posts = [];
    try {
      if (userId) {
        posts = await sql`SELECT * FROM posts WHERE user_id = ${userId}`;
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }

    const isValidBasicPlan = isBasicPlan && posts.length < 3;

    // ✅ Render UI
    return (
      <main className="w-full min-h-screen bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-amber-50 -z-10" />

        <div className="w-full max-w-[1400px] mx-auto px-6 py-24">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-3">
              <Badge className="bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600 px-4 py-1.5 text-sm font-medium capitalize">
                {planTypeName} Plan
              </Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 font-plus-jakarta mb-4">
              Create Amazing Content
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl">
              Upload your audio or video file and let our AI transform it into an engaging blog post.
            </p>
          </div>

          {/* Plan Benefits */}
          {(isBasicPlan || isProPlan) && (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-orange-100/20 shadow-lg mb-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center shrink-0">
                  <Sparkles className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 font-plus-jakarta mb-2">
                    Your Plan Benefits
                  </h2>
                  <p className="text-gray-600">
                    You get{" "}
                    <span className="font-semibold text-orange-600 bg-orange-50 px-2 py-1 rounded-md">
                      {isBasicPlan ? "5" : "Unlimited"} blog posts
                    </span>{" "}
                    as part of the{" "}
                    <span className="font-semibold capitalize">
                      {planTypeName}
                    </span>{" "}
                    Plan
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Upload Form or Upgrade Prompt */}
          {isValidBasicPlan || isProPlan ? (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-orange-100/20 shadow-lg p-8">
              <UploadForm />
            </div>
          ) : (
            <UpgradeYourPlan />
          )}
        </div>
      </main>
    );
  } catch (error) {
    console.error("Dashboard Error:", error);
    return redirect("/error");
  }
}
