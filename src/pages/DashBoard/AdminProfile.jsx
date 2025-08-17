import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaUtensils } from "react-icons/fa"; // Correct import

const AdminProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: meals = [], isLoading } = useQuery({
    queryKey: ["adminMeals", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/admin_meals?email=${user.email}`);
      return res.data;
    },
  });

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-2xl">
      <h2 className="text-3xl font-bold mb-8 text-center text-primary">
        Admin Profile
      </h2>

      <div className="flex flex-col md:flex-row items-center gap-8 border-b pb-6 mb-6">
        {/* Profile Image */}
        <img
          src={user?.photoURL}
          alt="Admin"
          className="w-32 h-32 rounded-full object-cover border-4 border-primary shadow"
        />

        {/* Profile Info */}
        <div className="flex-1 space-y-3 text-lg">
          <p>
            <span className="font-semibold">Name:</span>{" "}
            <span className="text-gray-700">{user?.displayName || "No Name"}</span>
          </p>
          <p>
            <span className="font-semibold">Email:</span>{" "}
            <span className="text-gray-700">{user?.email}</span>
          </p>
          <p>
            <span className="font-semibold">Role:</span>{" "}
            <span className="text-indigo-600 font-semibold">Admin</span>
          </p>
          <p className="flex items-center gap-2 mt-2 text-green-600 font-medium">
            < FaUtensils />
            Meals Added: <span className="font-bold">{meals.length}</span>
          </p>
        </div>
      </div>

      {isLoading && (
        <p className="mt-4 text-center text-blue-500">Loading meals...</p>
      )}
    </div>
  );
};

export default AdminProfile;
