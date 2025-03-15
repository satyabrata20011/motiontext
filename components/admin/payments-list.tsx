import getDbConnection from "@/lib/db";
import { formatDistanceToNow } from "date-fns";

let sql: any;

interface Payment {
  id: number | string;
  user_email: string;
  amount: number;
  status: string;
  created_at: string | Date;
  full_name: string | null;
  email: string | null;
}

async function getRecentPayments(): Promise<Payment[]> {
  if (!sql) {
    sql = await getDbConnection();
  }
  const payments = await sql`
    SELECT 
      p.id,
      p.user_email,
      p.amount,
      p.status,
      p.created_at,
      u.full_name,
      u.email
    FROM payments p
    LEFT JOIN users u ON p.user_email = u.email
    ORDER BY p.created_at DESC 
    LIMIT 10
  `;
  return payments; // Use `payments.rows` if your library requires it
}

export default async function PaymentsList() {
  const payments: Payment[] = (await getRecentPayments()) || [];

  if (!payments.length) {
    return <div className="text-gray-500 p-4">No payments found.</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th className="px-4 py-3">User</th>
            <th className="px-4 py-3">Amount</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Date</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id} className="border-b bg-white hover:bg-gray-50">
              <td className="px-4 py-3">
                <div>
                  <div className="font-medium text-gray-900">
                    {payment.full_name || "N/A"}
                  </div>
                  <div className="text-gray-500">{payment.email}</div>
                </div>{" "}
                {/* Ensure this closing div is present */}
              </td>
              <td className="px-4 py-3 font-medium">
                ${payment.amount.toFixed(2)} {/* Adjust if not in cents */}
              </td>
              <td className="px-4 py-3">
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    payment.status === "succeeded"
                      ? "bg-green-100 text-green-700"
                      : payment.status === "refunded"
                      ? "bg-orange-100 text-orange-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {payment.status}
                </span>
              </td>
              <td className="px-4 py-3 text-gray-500">
                {formatDistanceToNow(new Date(payment.created_at), {
                  addSuffix: true,
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
