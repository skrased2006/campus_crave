import { FaHeart } from "react-icons/fa";
import Swal from "sweetalert2";
import { useState } from "react";
import { Navigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const LikeButton = ({ mealId, likes, onLikeUpdate }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    if (!user) {

      <Navigate to='/login'></Navigate>
    }

    if (liked) return; // Prevent multiple likes

    try {
      const res = await axiosSecure.patch(`/meals/like/${mealId}`);
      if (res.data.modifiedCount > 0) {
        setLiked(true);
        onLikeUpdate(); // update parent state or re-fetch data
      }
    } catch (err) {
      console.error("Error liking meal:", err);
    }
  };

  return (
    <button
      onClick={handleLike}
      disabled={liked}
      className={`flex items-center gap-1 ${liked ? "text-yellow-400 cursor-not-allowed" : "text-red-500 hover:text-red-600"
        }`}
    >
      <FaHeart />
      {likes + (liked ? 1 : 0)}
    </button>
  );
};

export default LikeButton;
