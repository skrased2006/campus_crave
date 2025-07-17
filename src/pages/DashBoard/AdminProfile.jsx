import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const AdminProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();


  const { data: meals = [], isLoading } = useQuery({
    queryKey: ['adminMeals', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/admin_meals?email=${user.email}`);
      return res.data;
    }
  });

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Admin Profile</h2>

      <div className="flex items-center gap-6">
        <img
          src={user?.photoURL}
          alt="Admin"
          className="w-24 h-24 rounded-full object-cover border"
        />
        <div>
          <h3 className="text-xl font-semibold">{user?.displayName || "No Name"}</h3>
          <p className="text-gray-600">{user?.email}</p>
          <p className="mt-2 text-green-600 font-medium">
            Meals Added: <span className="font-bold">{meals.length}</span>
          </p>
        </div>
      </div>

      {isLoading && <p className="mt-4 text-blue-500">Loading meals...</p>}
    </div>
  );
};

export default AdminProfile;
