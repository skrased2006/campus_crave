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
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-primary text-center">Payment History</h2>

      {payments.length === 0 ? (
        <p className="text-gray-500 text-center">No payments found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {payments.map((payment, idx) => (
            <div
              key={payment._id}
              className="bg-white shadow-md rounded-xl p-4 border border-gray-100"
            >
              <h3 className="text-lg font-semibold text-primary mb-1">{payment.packageTitle}</h3>
              <p className="text-sm mb-1">
                <span className="font-medium">Badge:</span>{" "}
                <span
                  className={`badge ${payment.badge === "Platinum"
                      ? "bg-purple-500 text-white"
                      : payment.badge === "Gold"
                        ? "bg-yellow-500 text-white"
                        : "bg-gray-400 text-white"
                    }`}
                >
                  {payment.badge}
                </span>
              </p>
              <p className="text-sm mb-1">
                <span className="font-medium">Amount:</span> ${payment.amount}
              </p>
              <p className="text-sm mb-1 break-words">
                <span className="font-medium">Transaction ID:</span>{" "}
                {payment.transactionId}
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-medium">Date:</span>{" "}
                {new Date(payment.date).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
