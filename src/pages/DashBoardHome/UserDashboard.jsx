import React from "react";
import {
  FaUtensils,
  FaStar,
  FaRegCreditCard,
  FaUserCircle,
} from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const UserDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["userDashboardStats", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/dashboard-stats?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <span className="loading loading-spinner text-primary loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-primary">Welcome, {user?.displayName}!</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card bg-base-100 shadow border p-6 flex flex-col items-center text-center">
          <FaUtensils className="text-4xl text-info" />
          <h3 className="font-bold mt-2">Requested Meals</h3>
          <p className="text-3xl font-bold text-primary">{stats?.requestedMeals || 0}</p>
        </div>

        <div className="card bg-base-100 shadow border p-6 flex flex-col items-center text-center">
          <FaStar className="text-4xl text-yellow-500" />
          <h3 className="font-bold mt-2">My Reviews</h3>
          <p className="text-3xl font-bold text-primary">{stats?.reviews || 0}</p>
        </div>

        <div className="card bg-base-100 shadow border p-6 flex flex-col items-center text-center">
          <FaRegCreditCard className="text-4xl text-success" />
          <h3 className="font-bold mt-2">Payments</h3>
          <p className="text-3xl font-bold text-primary">{stats?.payments || 0}</p>
        </div>

        <div className="card bg-base-100 shadow border p-6 flex flex-col items-center text-center">
          <FaUserCircle className="text-4xl text-neutral" />
          <h3 className="font-bold mt-2">Badge</h3>
          <p className="text-xl font-bold text-primary">{stats?.badge || "Bronze"}</p>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
