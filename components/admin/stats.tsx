import getDbConnection from "@/lib/db";
import { formatDistanceToNow } from "date-fns";

let sql: any;

async function getStats() {
  if (!sql) {
    sql = await getDbConnection(); // Await the connection
  }

  const [
    [{ count: totalUsers }],
    [{ count: totalPosts }],
    [{ sum: totalRevenue }],
    [{ count: activeSubscriptions }],
  ] = await Promise.all([
    sql`SELECT COUNT(*) as count FROM users`,
    sql`SELECT COUNT(*) as count FROM posts`,
    sql`
      SELECT COALESCE(SUM(amount), 0) as sum 
      FROM payments 
      WHERE status = 'complete'
    `,
    sql`SELECT COUNT(*) as count FROM users WHERE status = 'active'`,
  ]);

  return {
    totalUsers: Number(totalUsers),
    totalPosts: Number(totalPosts),
    totalRevenue: Number(totalRevenue),
    activeSubscriptions: Number(activeSubscriptions),
  };
}

export default async function AdminStats() {
  const stats = await getStats();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard title="Total Users" value={stats.totalUsers} icon="👥" />
      <StatCard title="Total Posts" value={stats.totalPosts} icon="📝" />
      <StatCard
        title="Total Revenue"
        value={`$${stats.totalRevenue.toFixed(2)}`}
        icon="💰"
      />
      <StatCard
        title="Active Subscriptions"
        value={stats.activeSubscriptions}
        icon="⭐"
      />
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string | number;
  icon: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-4">
        <span className="text-2xl">{icon}</span>
        <div>
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
}
