import { FaHeart } from "react-icons/fa";
import Swal from "sweetalert2";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-hot-toast";

const LikeButton = ({ mealId, likes = 0, refetch }) => {
  const { user, isPremium, likedMeals, setLikedMeals } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [liked, setLiked] = useState(likedMeals?.has(mealId));

  const handleLike = async () => {
    if (!user) {
      return Swal.fire("Please login first");
    }

    if (!isPremium) {
      return Swal.fire("Only premium users can like meals");
    }

    if (likedMeals.has(mealId)) {
      return Swal.fire("You already liked this meal");
    }

    try {
      const res = await axiosSecure.patch(`/upcoming-meals/${mealId}/like`);
      if (res.data.success) {
        toast.success("Thanks for liking!");
        setLiked(true);
        setLikedMeals((prev) => new Set(prev).add(mealId));
        if (refetch) refetch();
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to like meal");
    }
  };

  return (
    <button
      onClick={handleLike}
      disabled={liked}
      className={`flex items-center gap-1 text-lg ${liked
        ? "text-yellow-500 cursor-not-allowed"
        : "text-red-500 hover:text-red-600"
        }`}
    >
      <FaHeart />
      {likes + (liked ? 1 : 0)}
    </button>
  );
};

export default LikeButton;
