import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import MealUpdate from "./MealUpdate";

const AllMeals = () => {
  const [meals, setMeals] = useState([]);
  const [sortField, setSortField] = useState("likes");
  const axiosSecure = useAxiosSecure();
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const navigate = useNavigate();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    axiosSecure
      .get(`/allmeals?sortBy=${sortField}&order=desc`)
      .then((res) => setMeals(res.data))
      .catch((err) => console.error(err));
  }, [sortField, axiosSecure]);

  const handleView = (id) => navigate(`/meal/${id}`);

  const handleUpdate = (meal) => {
    setSelectedMeal(meal);
    setShowUpdateModal(true);
  };

  // const handleMealUpdate = async (updatedMeal) => {
  //   try {
  //     const res = await axiosSecure.put(`/meals/${updatedMeal._id}`, updatedMeal);
  //     if (res.data.modifiedCount > 0) {
  //       Swal.fire("Success", "Meal updated successfully", "success");
  //       setMeals((prev) =>
  //         prev.map((m) => (m._id === updatedMeal._id ? updatedMeal : m))
  //       );
  //       setShowUpdateModal(false);
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     Swal.fire("Error", "Failed to update meal", "error");
  //   }
  // };

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
            Swal.fire("Deleted!", "Meal has been deleted.", "success");
            setMeals((prev) => prev.filter((meal) => meal._id !== id));
          } else {
            Swal.fire("Error!", "Failed to delete the meal.", "error");
          }
        } catch (error) {
          Swal.fire("Error!", "Something went wrong while deleting.", "error");
        }
      }
    });
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMeals = meals.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(meals.length / itemsPerPage);

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

      {/* Table */}
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
          {currentMeals.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center py-4">
                No meals found.
              </td>
            </tr>
          ) : (
            currentMeals.map((meal, index) => (
              <tr key={meal._id} className="hover:bg-gray-50">
                <td>{indexOfFirstItem + index + 1}</td>
                <td>{meal.title}</td>
                <td>{meal.likes}</td>
                <td>{meal.reviews_count || 0}</td>
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
                    onClick={() => handleUpdate(meal)}
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

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`btn btn-sm ${currentPage === i + 1 ? "btn-primary" : "btn-outline"}`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Update Modal */}
      {showUpdateModal && selectedMeal && (
        <MealUpdate
          mealData={selectedMeal}
          closeModal={() => setShowUpdateModal(false)}
          refetch={() =>
            axiosSecure
              .get(`/allmeals?sortBy=${sortField}&order=desc`)
              .then((res) => setMeals(res.data))
          }
        />
      )}
    </div>
  );
};

export default AllMeals;
