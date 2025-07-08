import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AllMeals = () => {
  const [meals, setMeals] = useState([]);
  const [sortField, setSortField] = useState("likes");
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get(`/allmeals?sortBy=${sortField}&order=desc`)
      .then((res) => setMeals(res.data))
      .catch((err) => console.error(err));
  }, [sortField]);

  const handleDelete = (id) => {
    // TODO: add delete API call
    console.log("Delete meal id:", id);
  };

  const handleUpdate = (id) => {
    // TODO: redirect or open update modal
    console.log("Update meal id:", id);
  };

  const handleView = (id) => {
    // TODO: redirect to meal details page
    console.log("View meal id:", id);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">All Meals</h2>

      {/* Sorting */}
      <div className="mb-4">
        <label className="mr-2 font-semibold">Sort By:</label>
        <select
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
          className="select select-bordered w-40"
        >
          <option value="likes">Likes</option>
          <option value="reviews_count">Reviews Count</option>
        </select>
      </div>

      {/* Meals Table */}
      <table className="table w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th>No</th>
            <th>Meal Title</th>
            <th>Likes</th>
            <th>Reviews</th>
            <th>Rating</th>
            <th>Distributor</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {meals.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center py-4">
                No meals found.
              </td>
            </tr>
          ) : (
            meals.map((meal, index) => (
              <tr key={meal._id} className="hover:bg-gray-50">
                <td>{index + 1}</td>
                <td>{meal.title}</td>
                <td>{meal.likes}</td>
                <td>{meal.reviews_count}</td>
                <td>{meal.rating}</td>
                <td>{meal.distributor || "N/A"}</td>
                <td className="space-x-2">
                  <button
                    onClick={() => handleView(meal._id)}
                    className="btn btn-sm btn-info"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleUpdate(meal._id)}
                    className="btn btn-sm btn-warning"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(meal._id)}
                    className="btn btn-sm btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllMeals;
