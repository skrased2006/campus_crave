// RecentMeals.jsx
import React, { useEffect, useState } from 'react';

const RecentMeals = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/recent-meals') // backend API
      .then(res => res.json())
      .then(data => {
        setMeals(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch recent meals:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center mt-10 text-gray-600">Loading...</p>;
  }

  return (
    <section className="py-16 px-6 md:px-12 lg:px-24 bg-gray-50">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Recent Additions</h2>
        <p className="text-gray-600 mt-2">Check out our latest meals!</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {meals.map(meal => (
          <div
            key={meal._id}
            className="bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg"
          >
            <img
              src={meal.image}
              alt={meal.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{meal.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{meal.description}</p>
              <button className="px-4 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition">
                See More
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentMeals;
