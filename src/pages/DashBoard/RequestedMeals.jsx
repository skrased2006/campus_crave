import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { FaTimesCircle } from 'react-icons/fa';
import Swal from 'sweetalert2';

const RequestedMeals = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: requests = [], refetch, isLoading } = useQuery({
    queryKey: ['mealRequests', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/meal-requests/${user.email}`);
      return res.data;
    },
  });

  const handleCancel = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to cancel this request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/meal-requests/${id}`);
        refetch();

        Swal.fire({
          title: "Cancelled!",
          text: "Your meal request has been cancelled.",
          icon: "success",
          toast: true,
          position: "top-end",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (error) {
        Swal.fire("Error", "Failed to cancel the request", "error");
      }
    }
  };


  if (!user) {
    return (
      <p className="text-center mt-10 text-gray-500">
        Please login to see your requested meals.
      </p>
    );
  }

  if (isLoading) {
    return <p className="text-center py-10 text-lg text-primary">Loading your requests...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-primary text-center">🍽️ Your Requested Meals</h2>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="table w-full">
          <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
            <tr>
              <th className="py-3 px-4 text-left">Meal Title</th>
              <th className="py-3 px-4 text-center">Likes</th>
              <th className="py-3 px-4 text-center">Reviews</th>
              <th className="py-3 px-4 text-center">Status</th>
              <th className="py-3 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.length > 0 ? (
              requests.map((req) => (
                <tr key={req._id} className="hover:bg-gray-50 transition">
                  <td className="py-3 px-4 font-medium text-gray-800">{req.mealTitle}</td>
                  <td className="py-3 px-4 text-center text-yellow-600 font-semibold">
                    {req.likes}
                  </td>
                  <td className="py-3 px-4 text-center text-blue-600 font-semibold">
                    {req.reviews_count || 0}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${req.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : req.status === 'delivered'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-600'
                        }`}
                    >
                      {req.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleCancel(req._id)}
                      className="inline-flex items-center gap-2 bg-red-100 hover:bg-red-200 text-red-600 font-semibold px-4 py-1.5 rounded-full text-sm transition"
                    >
                      <FaTimesCircle />
                      Cancel
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-10">
                  <div className="text-gray-400 flex flex-col items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 text-gray-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 17v-2a4 4 0 014-4h2m4 4v4m0 0h-4m4 0l-5-5M7 7a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                    <p>No meal requests found.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestedMeals;
