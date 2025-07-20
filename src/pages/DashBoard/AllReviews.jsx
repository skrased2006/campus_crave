import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AllReviews = () => {
  const axiosSecure = useAxiosSecure();

  const { data: reviews = [], refetch } = useQuery({
    queryKey: ["allReviews"],
    queryFn: async () => {
      const res = await axiosSecure.get("/reviews");
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    const confirmed = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirmed.isConfirmed) return;

    try {
      const res = await axiosSecure.delete(`/reviews/${id}`);
      if (res.data.deletedCount > 0) {
        Swal.fire("Deleted!", "Review has been deleted.", "success");
        refetch();
      }
    } catch (err) {
      Swal.fire("Error", "Something went wrong!", "error");
    }
  };

  if (reviews.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-10">No reviews found.</p>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-primary mb-6">All Reviews</h2>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Meal Title</th>
              <th>Likes</th>
              <th>Review</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr key={review._id}>
                <td>{review.mealTitle || "Untitled Meal"}</td>
                <td>{review.like || 0}</td>
                <td>{review.reviews_count}</td>
                <td className="space-x-2">
                  <button
                    onClick={() => handleDelete(review._id)}
                    className="btn btn-sm btn-error"
                  >
                    Delete
                  </button>
                  <Link to={`/meal/${review.mealId}`}>
                    <button className="btn btn-sm btn-info">View</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="border rounded-lg p-4 shadow-sm bg-white"
          >
            <h3 className="font-semibold text-lg mb-2">
              {review.mealTitle || "Untitled Meal"}
            </h3>
            <p>
              <span className="font-semibold">Likes:</span>{" "}
              {review.likes || 0}
            </p>
            <p className="mb-3">
              <span className="font-semibold">Review:</span>{" "}
              {review.reviews_count || 0}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => handleDelete(review._id)}
                className="btn btn-sm btn-error flex-1"
              >
                Delete
              </button>
              <Link to={`/meal/${review.mealId}`} className="flex-1">
                <button className="btn btn-sm btn-info w-full">View</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllReviews;
