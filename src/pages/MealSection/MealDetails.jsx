import { useParams } from "react-router";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaThumbsUp } from "react-icons/fa";

const MealDetails = () => {
  const { id } = useParams();
  console.log(id)
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [meal, setMeal] = useState(null);
  const [liked, setLiked] = useState(false);
  const [reviews, setReviews] = useState([]);

  // Fetch meal data
  useEffect(() => {
    axiosSecure.get(`/meals/${id}`).then((res) => {
      setMeal(res.data);
    });
  }, [id, axiosSecure]);

  // Fetch reviews
  useEffect(() => {
    axiosSecure.get(`/reviews/${id}`).then((res) => {
      setReviews(res.data);
    });
  }, [id, axiosSecure]);

  // Like handler
  const handleLike = async () => {
    if (!user) return Swal.fire("Please login to like the meal.");
    if (liked) return;

    const res = await axiosSecure.patch(`/meals/like/${id}`);
    if (res.data.modifiedCount > 0) {
      setMeal((prev) => ({ ...prev, likes: prev.likes + 1 }));
      setLiked(true);
    }
  };

  // Request Meal
  const handleRequest = async () => {
    if (!user || user?.badge === "Bronze") {
      return Swal.fire("Only premium users can request meals.");
    }

    const res = await axiosSecure.post("/requests", {
      mealId: id,
      userEmail: user.email,
      status: "pending",
    });

    if (res.data.insertedId) {
      Swal.fire("Request Sent", "Your meal request is pending approval.", "success");
    }
  };

  // Add Review
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const text = form.review.value;

    const res = await axiosSecure.post("/reviews", {
      mealId: id,
      email: user.email,
      name: user.displayName,
      photo: user.photoURL,
      review: text,
      time: new Date(),
    });

    if (res.data.insertedId) {
      Swal.fire("Review added!");
      setReviews([...reviews, res.data.review]);
      form.reset();
    }
  };

  if (!meal) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      {/* Meal Info */}
      <div className="grid md:grid-cols-2 gap-6 items-center">
        <img src={meal.image} alt={meal.title} className="w-full rounded-xl" />
        <div>
          <h2 className="text-3xl font-bold text-primary mb-2">{meal.title}</h2>
          <p className="text-gray-600 mb-1">
            <span className="font-semibold">Distributor:</span> {meal.distributor}
          </p>
          <p className="text-yellow-500 font-medium">⭐ {meal.rating}</p>
          <p className="text-sm text-gray-500 mb-4">
            Posted on: {new Date(meal.postTime).toLocaleDateString()}
          </p>

          <p className="text-gray-700 mb-4">{meal.description}</p>

          <div className="flex gap-4">
            <button
              onClick={handleLike}
              className="btn btn-outline btn-sm flex items-center gap-2"
            >
              <FaThumbsUp /> Like ({meal.likes || 0})
            </button>

            <button
              onClick={handleRequest}
              className="btn btn-primary btn-sm"
            >
              Request Meal
            </button>
          </div>
        </div>
      </div>

      {/* Review Section */}
      <div className="mt-10">
        <h3 className="text-2xl font-bold mb-4 text-primary">Reviews</h3>

        {user && (
          <form onSubmit={handleReviewSubmit} className="mb-6 space-y-2">
            <textarea
              name="review"
              placeholder="Write your review here..."
              className="textarea textarea-bordered w-full"
              required
            />
            <button className="btn btn-primary btn-sm">Submit Review</button>
          </form>
        )}

        <div className="space-y-4">
          {reviews.length > 0 ? (
            reviews.map((r, idx) => (
              <div
                key={idx}
                className="bg-base-100 shadow p-4 rounded-md border border-gray-200"
              >
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src={r.photo || "/default-avatar.png"}
                    alt={r.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <p className="font-semibold">{r.name}</p>
                  <span className="text-gray-400 text-sm">
                    {new Date(r.time).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-700">{r.review}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No reviews yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MealDetails;
