import getDbConnection from "@/lib/db";
import { formatDistanceToNow } from "date-fns";

let sql: any;

interface Post {
  id: number | string; // Adjust based on your DB schema
  user_id: string;
  title: string;
  created_at: string | Date;
  full_name: string | null;
  email: string | null;
}

async function getRecentPosts(): Promise<Post[]> {
  if (!sql) {
    sql = await getDbConnection();
  }
  const posts = await sql`
    SELECT 
      p.id,
      p.user_id,
      p.title,
      p.created_at,
      u.full_name,
      u.email
    FROM posts p
    LEFT JOIN users u ON p.user_id = u.user_id
    ORDER BY p.created_at DESC 
    LIMIT 10
  `;
  return posts; // Use `posts.rows` if your library returns { rows: [...] }
}

export default async function PostsList() {
  const posts: Post[] = (await getRecentPosts()) || [];

  if (!posts.length) {
    return <div className="text-gray-500 p-4">No posts found.</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th className="px-4 py-3">Title</th>
            <th className="px-4 py-3">Author</th>
            <th className="px-4 py-3">Created</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id} className="border-b bg-white hover:bg-gray-50">
              <td className="px-4 py-3">
                <div className="font-medium text-gray-900 line-clamp-2">
                  {post.title || "Untitled"}
                </div>
              </td>
              <td className="px-4 py-3">
                <div>
                  <div className="font-medium text-gray-900">
                    {post.full_name || "N/A"}
                  </div>
                  <div className="text-gray-500">
                    {post.email || "No email"}
                  </div>
                </div>
              </td>
              <td className="px-4 py-3 text-gray-500">
                {post.created_at
                  ? formatDistanceToNow(new Date(post.created_at), {
                      addSuffix: true,
                    })
                  : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
