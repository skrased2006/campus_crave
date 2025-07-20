import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

const categories = ["Breakfast", "Lunch", "Dinner", "All Meals"];
const pageSize = 6;

const MealTabs = () => {
  const [activeTab, setActiveTab] = useState("Breakfast");
  const navigate = useNavigate();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, } = useInfiniteQuery({
    queryKey: ["meals", activeTab],
    queryFn: async ({ pageParam = 0 }) => {
      let url = `https://campas-crave-server.vercel.app/meals?page=${pageParam}&size=${pageSize}`;
      if (activeTab !== "All Meals") {
        url += `&category=${activeTab}`;
      }
      const res = await axios.get(url);
      return res.data;
    },
    getNextPageParam: (lastPage, allPages) => {

      if (lastPage.length === pageSize) {
        return allPages.length;
      } else {
        return undefined;
      }
    },
  });

  const allMeals = data?.pages.flat() || [];

  return (
    <section className="py-12 px-4 max-w-9/12 mx-auto">
      <h2 className="text-3xl font-bold text-primary mb-8 text-center">
        Meals by Category
      </h2>

      {/* Tabs */}
      <div className="flex justify-center mb-8 gap-4 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`px-5 py-2 rounded-full font-semibold transition-colors ${activeTab === cat
              ? "bg-primary text-white shadow-md"
              : "bg-gray-200 text-gray-800 hover:bg-primary hover:text-white"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Loading / Error */}
      {isLoading && <p className="text-center py-10">Loading meals...</p>}
      {isError && (
        <p className="text-center text-red-500">Error loading meals.</p>
      )}

      {/* Meal Cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        key={activeTab}
      >
        {allMeals.map(({ _id, title, image, rating, price }, index) => (
          <motion.div
            key={_id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer overflow-hidden"
            whileHover={{ scale: 1.03 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <img src={image} alt={title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-bold mb-1">{title}</h3>
              <p className="text-yellow-500 text-sm mb-1">
                ⭐ {rating?.toFixed(1) || 0}
              </p>
              <p className="font-semibold text-gray-800 mb-2">
                ${price?.toFixed(2)}
              </p>
              <button
                onClick={() => navigate(`/meal/${_id}`)}
                className="btn btn-primary btn-sm w-full"
              >
                Details
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Load More Button */}
      <div className="text-center mt-6">
        {hasNextPage ? (
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="btn btn-primary"
          >
            {isFetchingNextPage ? "Loading more..." : "Load More"}
          </button>
        ) : (
          allMeals.length > 0 && (
            <span className="text-gray-500 text-sm">No more meals to show.</span>
          )
        )}
      </div>
    </section>
  );
};

export default MealTabs;



