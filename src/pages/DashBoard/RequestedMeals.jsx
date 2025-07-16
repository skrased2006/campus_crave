import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { FaTimesCircle } from 'react-icons/fa';
import Swal from 'sweetalert2';
import LoadingSpinner from '../../components/LoadingSpinner';

const RequestedMeals = () => {
  const { user, loading } = useAuth();
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

  if (loading || isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-primary text-center">🍽️ Your Requested Meals</h2>

      {requests.length === 0 ? (
        <div className="text-center py-10 text-gray-400 flex flex-col items-center gap-2">
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
      ) : (
        <>
          {/* Desktop/tablet view: table */}
          <div className="hidden md:block overflow-x-auto bg-white rounded-xl shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100 text-gray-700 text-xs sm:text-sm uppercase">
                <tr>
                  <th className="py-3 px-4 text-left whitespace-nowrap">Meal Title</th>
                  <th className="py-3 px-4 text-center whitespace-nowrap">Likes</th>
                  <th className="py-3 px-4 text-center whitespace-nowrap">Reviews</th>
                  <th className="py-3 px-4 text-center whitespace-nowrap">Status</th>
                  <th className="py-3 px-4 text-center whitespace-nowrap">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {requests.map((req) => (
                  <tr
                    key={req._id}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="py-3 px-4 font-medium text-gray-800 whitespace-nowrap">
                      {req.mealTitle}
                    </td>
                    <td className="py-3 px-4 text-center text-yellow-600 font-semibold whitespace-nowrap">
                      {req.likes}
                    </td>
                    <td className="py-3 px-4 text-center text-blue-600 font-semibold whitespace-nowrap">
                      {req.reviews_count || 0}
                    </td>
                    <td className="py-3 px-4 text-center whitespace-nowrap">
                      <span
                        className={`px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${req.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-700'
                            : req.status === 'delivered'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                      >
                        {req.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center whitespace-nowrap">
                      <button
                        onClick={() => handleCancel(req._id)}
                        className="inline-flex items-center gap-2 bg-red-100 hover:bg-red-200 text-red-600 font-semibold px-4 py-1.5 rounded-full text-sm transition"
                      >
                        <FaTimesCircle />
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile view: cards */}
          <div className="md:hidden space-y-4">
            {requests.map((req) => (
              <div
                key={req._id}
                className="bg-white rounded-lg shadow p-4 flex flex-col gap-2"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-lg text-gray-800">{req.mealTitle}</h3>
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
                </div>

                <div className="flex justify-between text-sm text-gray-600">
                  <p>
                    <span className="font-semibold text-yellow-600">{req.likes}</span> Likes
                  </p>
                  <p>
                    <span className="font-semibold text-blue-600">{req.reviews_count || 0}</span> Reviews
                  </p>
                </div>

                <button
                  onClick={() => handleCancel(req._id)}
                  className="mt-2 inline-flex items-center gap-2 bg-red-100 hover:bg-red-200 text-red-600 font-semibold px-4 py-1.5 rounded-full text-sm transition"
                >
                  <FaTimesCircle />
                  Cancel
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default RequestedMeals;
