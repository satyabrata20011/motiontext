import BgGradient from "@/components/common/bg-gradient";
import getDbConnection from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { ArrowRight, FileText } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await currentUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const sql = await getDbConnection();
  const posts = await sql`SELECT * from posts where user_id = ${user.id}`;

  return (
    <main className="w-full min-h-screen bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-amber-50 -z-10" />

      <div className="w-full max-w-[1400px] mx-auto px-6 py-24">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <span className="inline-block text-sm font-semibold text-orange-600 bg-orange-50 px-4 py-2 rounded-full">
              Your Content
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 font-plus-jakarta mb-4">
            Your Blog Posts
          </h1>
          {posts.length > 0 && (
            <p className="text-gray-600 text-lg">
              Manage and edit your AI-generated blog posts
            </p>
          )}
        </div>

        {posts.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-orange-100/20 shadow-lg max-w-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 font-plus-jakarta">
                  No posts yet
                </h3>
                <p className="text-gray-600">Create your first blog post</p>
              </div>
            </div>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium transition-colors"
            >
              Go to Dashboard <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <BgGradient key={post.id}>
                <div className="group bg-white/80 backdrop-blur-sm rounded-xl border border-orange-100/20 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col">
                  <div className="p-6 flex flex-col h-full">
                    <h2 className="text-xl font-semibold text-gray-900 mb-3 font-plus-jakarta line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 text-base mb-6 flex-grow line-clamp-4">
                      {post.content.split("\n").slice(1).join("\n")}
                    </p>
                    <Link
                      href={`/posts/${post.id}`}
                      className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium transition-colors group-hover:gap-3"
                    >
                      Read more{" "}
                      <ArrowRight className="w-4 h-4 transition-transform duration-200" />
                    </Link>
                  </div>
                </div>
              </BgGradient>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
