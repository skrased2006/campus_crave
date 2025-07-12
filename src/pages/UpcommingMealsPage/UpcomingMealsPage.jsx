import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useUserRole from "../../hooks/useUserRole";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const UpcomingMealsPage = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { badge } = useUserRole();
  const [likedMeals, setLikedMeals] = useState(new Set());

  const { data: upcomingMeals = [], refetch } = useQuery({
    queryKey: ["upcomingMeals"],
    queryFn: async () => {
      const res = await axiosSecure.get("/upcoming-meals");
      return res.data;
    },
  });

  // ইউজারের আগে থেকে লাইক করা মিল গুলো লোড করব এখানে
  useEffect(() => {
    if (user && upcomingMeals.length > 0) {
      const likedSet = new Set();
      upcomingMeals.forEach((meal) => {
        if (meal.likedUsers && meal.likedUsers.includes(user.email)) {
          likedSet.add(meal._id);
        }
      });
      setLikedMeals(likedSet);
    }
  }, [user, upcomingMeals]);

  const isPremium = badge && ["Silver", "Gold", "Platinum"].includes(badge);

  const handleLike = async (mealId) => {
    if (!user) return Swal.fire({ toast: true, position: 'top-end', icon: 'info', title: 'Please login first', timer: 2000, showConfirmButton: false });
    if (!isPremium) return Swal.fire({ toast: true, position: 'top-end', icon: 'warning', title: 'Only premium users can like meals', timer: 2000, showConfirmButton: false });
    if (likedMeals.has(mealId)) return Swal.fire({ toast: true, position: 'top-end', icon: 'error', title: 'You already liked this meal', timer: 2000, showConfirmButton: false });


    try {
      const res = await axiosSecure.patch(`/upcoming-meals/like/${mealId}`, {
        userEmail: user.email,
      });

      if (res.data.modifiedCount > 0) {
        toast.success("Thank you for liking!");

        setLikedMeals((prev) => new Set(prev).add(mealId));
        refetch();
      } else if (res.data.message === "Already liked") {
        Swal.fire("You already liked this meal");
        setLikedMeals((prev) => new Set(prev).add(mealId));
      }
    } catch (err) {
      toast("Error", "Could not like the meal", "error");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 max-w-7xl mx-auto">
      {upcomingMeals.length === 0 && <p>No upcoming meals found</p>}

      {upcomingMeals.map((meal) => (
        <div key={meal._id} className="card bg-white shadow rounded p-4">
          <img
            src={meal.image}
            alt={meal.title}
            className="w-full h-48 object-cover rounded mb-4"
          />
          <h3 className="text-xl font-bold mb-2">{meal.title}</h3>
          <p className="text-gray-600 mb-1">Distributor: {meal.distributor}</p>
          <p className="text-gray-600 mb-2">Likes: {meal.likes || 0}</p>
          <button
            onClick={() => handleLike(meal._id)}
            disabled={!isPremium || likedMeals.has(meal._id)}
            className={`btn btn-sm ${likedMeals.has(meal._id)
              ? "btn-disabled opacity-50 cursor-not-allowed"
              : "btn-primary"
              }`}
          >
            {likedMeals.has(meal._id) ? "Liked" : "Like"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default UpcomingMealsPage;
