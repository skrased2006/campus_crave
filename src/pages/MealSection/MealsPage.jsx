import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const MealsPage = () => {
  const [meals, setMeals] = useState([]);
  const axiosSecure = useAxiosSecure();
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [totalMeals, setTotalMeals] = useState(0);
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
    setMeals((prev) => [...prev, ...newMeals]);
    setTotalMeals(res.data.total);
    if (meals.length + newMeals.length >= res.data.total) {
      setHasMore(false);
    }
  };

  useEffect(() => {
    setMeals([]);
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
    <div className="p-4 max-w-6xl mx-auto">
      {/* 🔍 Search & Filters */}
      <div className="flex gap-4 flex-wrap mb-4">
        <input
          type="text"
          name="search"
          placeholder="Search meals..."
          value={filters.search}
          onChange={handleFilterChange}
          className="input input-bordered"
        />
        <select name="category" value={filters.category} onChange={handleFilterChange} className="select">
          <option value="All">All</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
        </select>
        <input
          type="number"
          name="minPrice"
          placeholder="Min Price"
          value={filters.minPrice}
          onChange={handleFilterChange}
          className="input input-bordered w-24"
        />
        <input
          type="number"
          name="maxPrice"
          placeholder="Max Price"
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
        loader={<p>Loading more meals...</p>}
        endMessage={<p className="text-center">No more meals to load.</p>}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {meals.map((meal) => (
            <div key={meal._id} className="card p-4 border rounded shadow">
              <img src={meal.image} alt={meal.title} className="h-40 object-cover w-full rounded" />
              <h2 className="text-lg font-semibold mt-2">{meal.title}</h2>
              <p className="text-sm text-gray-600">{meal.category}</p>
              <p className="text-primary font-bold">${meal.price}</p>
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default MealsPage;
