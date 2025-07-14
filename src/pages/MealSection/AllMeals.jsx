import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AllMeals = () => {
  const [meals, setMeals] = useState([]);
  const [sortField, setSortField] = useState("likes");
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  useEffect(() => {
    axiosSecure
      .get(`/allmeals?sortBy=${sortField}&order=desc`)
      .then((res) => setMeals(res.data))
      .catch((err) => console.error(err));
  }, [sortField, axiosSecure]);

  // View: redirect to meal details page
  const handleView = (id) => {
    navigate(`/meal/${id}`);
  };

  // Update: redirect to update page (or you can open modal)
  const handleUpdate = (id) => {
    navigate(`/meal/update/${id}`);
  };

  // Delete: delete meal and update UI
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/allmeals/${id}`);
          if (res.data.deletedCount > 0) {
            Swal.fire(
              "Deleted!",
              "Meal has been deleted.",
              "success"
            );
            setMeals((prev) => prev.filter((meal) => meal._id !== id));
          } else {
            Swal.fire(
              "Error!",
              "Failed to delete the meal.",
              "error"
            );
          }
        } catch (error) {
          Swal.fire(
            "Error!",
            "Something went wrong while deleting.",
            "error"
          );
        }
      }
    });
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
