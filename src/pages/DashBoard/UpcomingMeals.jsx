import { useQuery } from "@tanstack/react-query";

import Swal from "sweetalert2";
import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const UpcomingMeals = () => {
  const axiosSecure = useAxiosSecure();
  const [showModal, setShowModal] = useState(false);

  const { data: upcomingMeals = [], refetch } = useQuery({
    queryKey: ["upcomingMeals"],
    queryFn: async () => {
      const res = await axiosSecure.get("/upcoming-meals");
      return res.data;
    },
  });

  const handlePublish = async (id) => {
    const confirm = window.confirm("Are you sure to publish this meal?");
    if (!confirm) return;

    const res = await axiosSecure.post(`/publish-meal/${id}`);
    if (res.data.message) {
      Swal.fire("Published!", res.data.message, "success");
      refetch();
    }
  };

  const handleAddUpcomingMeal = async (e) => {
    e.preventDefault();
    const form = e.target;

    const newMeal = {
      title: form.title.value,
      image: form.image.value,
      distributor: form.distributor.value,
      description: form.description.value,
      rating: parseFloat(form.rating.value),
      likes: 0,
      postTime: new Date(),
    };

    const res = await axiosSecure.post("/upcoming-meals", newMeal);
    if (res.data.insertedId) {
      Swal.fire("Added!", "Upcoming meal added", "success");
      setShowModal(false);
      refetch();
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold text-primary">Upcoming Meals</h2>
        <button onClick={() => setShowModal(true)} className="btn btn-primary btn-sm">
          Add Upcoming Meal
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Likes</th>
              <th>Distributor</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {upcomingMeals.map((meal) => (
              <tr key={meal._id}>
                <td>{meal.title}</td>
                <td>{meal.likes || 0}</td>
                <td>{meal.distributor}</td>
                <td>
                  <button onClick={() => handlePublish(meal._id)} className="btn btn-success btn-sm">
                    Publish
                  </button>
                </td>
              </tr>
            ))}
            {upcomingMeals.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center text-gray-500 py-4">
                  No upcoming meals found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-md">
            <h3 className="text-xl font-bold mb-4">Add Upcoming Meal</h3>
            <form onSubmit={handleAddUpcomingMeal} className="space-y-3">
              <input name="title" placeholder="Title" className="input input-bordered w-full" required />
              <input name="image" placeholder="Image URL" className="input input-bordered w-full" required />
              <input name="distributor" placeholder="Distributor" className="input input-bordered w-full" required />
              <input name="rating" placeholder="Rating (0-5)" type="number" step="0.1" className="input input-bordered w-full" required />
              <textarea name="description" placeholder="Description" className="textarea textarea-bordered w-full" required />
              <div className="flex justify-end gap-2">
                <button type="submit" className="btn btn-primary btn-sm">Add</button>
                <button type="button" onClick={() => setShowModal(false)} className="btn btn-error btn-sm">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpcomingMeals;
