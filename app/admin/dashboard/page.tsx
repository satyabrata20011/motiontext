import { Suspense } from "react";
import AdminStats from "@/components/admin/stats";
import UsersList from "@/components/admin/users-list";
import PaymentsList from "@/components/admin/payments-list";
import PostsList from "@/components/admin/posts-list";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

      <Suspense fallback={<div>Loading stats...</div>}>
        <AdminStats />
      </Suspense>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Users</h2>
          <Suspense fallback={<div>Loading users...</div>}>
            <UsersList />
          </Suspense>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Payments</h2>
          <Suspense fallback={<div>Loading payments...</div>}>
            <PaymentsList />
          </Suspense>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Recent Posts</h2>
          <Suspense fallback={<div>Loading posts...</div>}>
            <PostsList />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
