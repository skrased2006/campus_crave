import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  FaUtensils,
  FaStar,
  FaThumbsUp,
  FaClipboardList,
} from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const COLORS = ["#60A5FA", "#FBBF24", "#34D399", "#F87171"];

export default function AdminDashboard() {
  const axiosSecure = useAxiosSecure();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["adminStats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/dashboard-stats");
      return res.data; // { totalMeals, totalReviews, totalLikes, totalRequests }
    },
    staleTime: 1000 * 60 * 5,
  });

  const chartData = [
    { name: "Meals", value: stats.totalMeals || 0 },
    { name: "Reviews", value: stats.totalReviews || 0 },
    { name: "Likes", value: stats.totalLikes || 0 },
    { name: "Requests", value: stats.totalRequests || 0 },
  ];

  const iconMap = {
    totalMeals: <FaUtensils className="text-4xl text-info" />,
    totalReviews: <FaStar className="text-4xl text-warning" />,
    totalLikes: <FaThumbsUp className="text-4xl text-success" />,
    totalRequests: <FaClipboardList className="text-4xl text-error" />,
  };

  const labelMap = {
    totalMeals: "Total Meals",
    totalReviews: "Total Reviews",
    totalLikes: "Total Likes",
    totalRequests: "Requested Meals",
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-primary">🍽 Admin Dashboard</h2>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {Object.entries(stats).map(([key, value], idx) => (
          <div
            key={key}
            className="card bg-base-100 shadow-md border border-base-200 p-6 flex flex-col items-center justify-center"
          >
            {iconMap[key]}
            <h2 className="text-lg font-semibold mt-3">{labelMap[key]}</h2>
            <p className="text-4xl font-extrabold text-primary mt-2">{value}</p>
          </div>
        ))}
      </div>

      {/* Pie Chart */}
      <div className="card bg-base-100 shadow-md p-6">
        <h3 className="text-xl font-bold mb-4">System Summary Chart</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
