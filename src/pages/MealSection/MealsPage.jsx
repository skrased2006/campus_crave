import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';

const MealsPage = () => {
  const [meals, setMeals] = useState([]);
  const axiosSecure = useAxiosSecure();
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [totalMeals, setTotalMeals] = useState(0);
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    search: '',
    category: 'All',
    minPrice: '',
    maxPrice: ''
  });

  const limit = 6;

  const fetchMeals = async () => {
    const { search, category, minPrice, maxPrice } = filters;
    const res = await axiosSecure(`/mealpage`, {
      params: { page, limit, search, category, minPrice, maxPrice }
    });

    const newMeals = res.data.meals;
    setTotalMeals(res.data.total);

    if (page === 1) {
      setMeals(newMeals);
    } else {
      setMeals((prev) => [...prev, ...newMeals]);
    }

    if (newMeals.length < limit) {
      setHasMore(false);
    }
  };

  useEffect(() => {
    setPage(1);
    setHasMore(true);
  }, [filters]);

  useEffect(() => {
    fetchMeals();
  }, [page, filters]);

  const handleNext = () => {
    setPage((prev) => prev + 1);
  };

  const handleFilterChange = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      {/* 🔍 Search & Filters */}
      <div className="flex gap-4 flex-wrap mb-6 justify-center">
        <input
          type="text"
          name="search"
          placeholder="🔍 Search meals..."
          value={filters.search}
          onChange={handleFilterChange}
          className="input input-bordered w-full sm:w-64"
        />
        <select name="category" value={filters.category} onChange={handleFilterChange} className="select select-bordered w-full sm:w-40">
          <option value="All">All</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
        </select>
        <input
          type="number"
          name="minPrice"
          placeholder="Min 💸"
          value={filters.minPrice}
          onChange={handleFilterChange}
          className="input input-bordered w-24"
        />
        <input
          type="number"
          name="maxPrice"
          placeholder="Max 💰"
          value={filters.maxPrice}
          onChange={handleFilterChange}
          className="input input-bordered w-24"
        />
      </div>

      {/* ♾️ Infinite Meals */}
      <InfiniteScroll
        dataLength={meals.length}
        next={handleNext}
        hasMore={hasMore}
        loader={<p className="text-center text-lg text-gray-500">🍽️ Loading more meals...</p>}
        endMessage={<p className="text-center text-gray-400 mt-6">No more meals to load.</p>}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {meals.map((meal, index) => (
            <motion.div
              key={meal._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
            >
              <img src={meal.image} alt={meal.title} className="h-48 w-full object-cover" />
              <div className="p-4 space-y-2">
                <h2 className="text-xl font-semibold text-gray-800">{meal.title}</h2>
                <p className="text-sm text-gray-500">{meal.category}</p>
                <p className="text-primary font-bold text-lg">${meal.price}</p>
                <button
                  onClick={() => navigate(`/meal/${meal._id}`)}
                  className="btn btn-sm btn-primary w-full mt-2"
                >
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default MealsPage;
