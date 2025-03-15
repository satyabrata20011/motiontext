import getDbConnection from "@/lib/db";
import { formatDistanceToNow } from "date-fns";

let sql: any;

interface User {
  id: number | string;
  user_id: string;
  full_name: string | null;
  email: string | null;
  created_at: string | Date | null;
  status: string | null;
  price_id: string | null;
}

async function getRecentUsers(): Promise<User[]> {
  if (!sql) {
    sql = await getDbConnection();
  }

  const users = await sql`
    SELECT 
      id,
      user_id,
      full_name,
      email,
      created_at,
      status,
      price_id
    FROM users 
    ORDER BY created_at DESC 
    LIMIT 10
  `;
  return users; // Adjust to `users.rows` if needed
}

export default async function UsersList() {
  const users: User[] = (await getRecentUsers()) || [];

  if (users.length === 0) {
    return <div className="text-gray-500 p-4">No users found.</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th className="px-4 py-3">User</th>
            <th className="px-4 py-3">Plan</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Joined</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b bg-white hover:bg-gray-50">
              <td className="px-4 py-3">
                <div>
                  <div className="font-medium text-gray-900">
                    {user.full_name || "N/A"}
                  </div>
                  <div className="text-gray-500">
                    {user.email || "No email"}
                  </div>
                </div>
              </td>
              <td className="px-4 py-3">
                <span className="px-2 py-1 text-xs font-medium rounded-full">
                  {user.price_id
                    ? user.price_id.includes("pro")
                      ? "Pro"
                      : "Basic"
                    : "Free"}
                </span>
              </td>
              <td className="px-4 py-3">
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    user.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {user.status || "inactive"}
                </span>
              </td>
              <td className="px-4 py-3 text-gray-500">
                {user.created_at
                  ? formatDistanceToNow(new Date(user.created_at), {
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
