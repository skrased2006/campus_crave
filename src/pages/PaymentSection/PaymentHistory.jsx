import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../../components/LoadingSpinner";

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-primary text-center">Payment History</h2>

      {payments.length === 0 ? (
        <p className="text-gray-500 text-center">No payments found.</p>
      ) : (
        <>
          {/* ✅ Desktop/tablet view: Table */}
          <div className="hidden md:block overflow-x-auto rounded-xl shadow bg-white">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3 text-left">#</th>
                  <th className="px-4 py-3 text-left">Package</th>
                  <th className="px-4 py-3 text-left">Badge</th>
                  <th className="px-4 py-3 text-left">Amount</th>
                  <th className="px-4 py-3 text-left">Transaction ID</th>
                  <th className="px-4 py-3 text-left">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {payments.map((payment, index) => (
                  <tr key={payment._id} className="hover:bg-gray-50">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2 font-medium">{payment.packageTitle}</td>
                    <td className="px-4 py-2">
                      <span className={`badge text-white px-2 py-1 rounded-full ${payment.badge === "Platinum"
                        ? "bg-purple-500"
                        : payment.badge === "Gold"
                          ? "bg-yellow-500"
                          : "bg-gray-400"
                        }`}>
                        {payment.badge}
                      </span>
                    </td>
                    <td className="px-4 py-2">${payment.amount}</td>
                    <td className="px-4 py-2 break-all">{payment.transactionId}</td>
                    <td className="px-4 py-2">{new Date(payment.date).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ✅ Mobile view: Cards */}
          <div className="md:hidden space-y-4">
            {payments.map((payment) => (
              <div
                key={payment._id}
                className="bg-white shadow rounded-xl p-4 border border-gray-100"
              >
                <h3 className="text-lg font-semibold text-primary mb-2">{payment.packageTitle}</h3>

                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium">Badge:</span>
                  <span
                    className={`badge text-white px-3 py-1 rounded-full text-sm ${payment.badge === "Platinum"
                      ? "bg-purple-500"
                      : payment.badge === "Gold"
                        ? "bg-yellow-500"
                        : "bg-gray-400"
                      }`}
                  >
                    {payment.badge}
                  </span>
                </div>

                <div className="text-sm text-gray-700 space-y-1 mt-2">
                  <p><span className="font-medium">Amount:</span> ${payment.amount}</p>
                  <p className="break-words">
                    <span className="font-medium">Transaction ID:</span> {payment.transactionId}
                  </p>
                  <p>
                    <span className="font-medium">Date:</span>{" "}
                    {new Date(payment.date).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PaymentHistory;
