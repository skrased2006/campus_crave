import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useUserRole from "../../hooks/useUserRole";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

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

  // Load previously liked meals
  useEffect(() => {
    if (user && upcomingMeals.length > 0) {
      const likedSet = new Set();
      upcomingMeals.forEach((meal) => {
        if (meal.likedUsers?.includes(user.email)) {
          likedSet.add(meal._id);
        }
      });
      setLikedMeals(likedSet);
    }
  }, [user, upcomingMeals]);

  const isPremium = badge && ["Silver", "Gold", "Platinum"].includes(badge);

  const handleLike = async (mealId) => {
    if (!user) {
      return Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'info',
        title: 'Please login first',
        timer: 2000,
        showConfirmButton: false,
      });
    }

    if (!isPremium) {
      return Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'warning',
        title: 'Only premium users can like meals',
        timer: 2000,
        showConfirmButton: false,
      });
    }

    if (likedMeals.has(mealId)) {
      return Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: 'You already liked this meal',
        timer: 2000,
        showConfirmButton: false,
      });
    }

    try {
      const res = await axiosSecure.patch(`/upcoming-meals/like/${mealId}`, {
        userEmail: user.email,
      });

      if (res.data.modifiedCount > 0) {
        toast.success("👍 Thank you for liking!");
        setLikedMeals((prev) => new Set(prev).add(mealId));
        refetch();
      }
    } catch (err) {
      toast.error("Something went wrong. Try again.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-primary">
        Upcoming Meals
      </h2>

      {upcomingMeals.length === 0 ? (
        <p className="text-center text-gray-500">😔 No upcoming meals found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {upcomingMeals.map((meal, index) => (
            <motion.div
              key={meal._id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300 rounded-xl overflow-hidden flex flex-col"
            >
              <img
                src={meal.image}
                alt={meal.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-4 flex-grow">
                <h3 className="text-xl font-semibold text-gray-800 mb-1">{meal.title}</h3>
                <p className="text-gray-600 text-sm mb-1">👨‍🍳 Distributor: {meal.distributor}</p>
                <p className="text-gray-600 text-sm mb-2">❤️ Likes: {meal.likes || 0}</p>
              </div>
              <div className="p-4 pt-0">
                <button
                  onClick={() => handleLike(meal._id)}
                  disabled={!isPremium || likedMeals.has(meal._id)}
                  className={`btn btn-sm w-full ${likedMeals.has(meal._id)
                    ? "btn-disabled bg-gray-300 text-gray-600"
                    : "btn-primary"
                    }`}
                >
                  {likedMeals.has(meal._id) ? "Liked ❤️" : "Like"}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UpcomingMealsPage;

