import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
;

const imageHostKey = import.meta.env.VITE_IMAGEBB_API_KEY;
const imageHostUrl = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;

const UpcomingMeals = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const { data: upcomingMeals = [], refetch } = useQuery({
    queryKey: ["upcomingMeals"],
    queryFn: async () => {
      const res = await axiosSecure.get("/upcoming-meals");
      return res.data;
    },
  });

  const handlePublish = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You want to publish this meal?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, publish it!",
      cancelButtonText: "No, cancel",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await axiosSecure.post(`/publish-meal/${id}`);
      if (res.data.message) {
        Swal.fire("Published!", res.data.message, "success");
        refetch();
      }
    } catch (error) {
      Swal.fire("Error!", "Something went wrong!", "error");
    }
  };

  const handleAddUpcomingMeal = async (e) => {
    e.preventDefault();
    const form = e.target;
    const imageFile = form.image.files[0];

    if (!imageFile) {
      Swal.fire("Error", "Please select an image file.", "error");
      return;
    }

    // Upload image to imgbb
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const imgRes = await fetch(imageHostUrl, {
        method: "POST",
        body: formData,
      });

      const imgData = await imgRes.json();

      if (!imgData.success) {
        Swal.fire("Error", "Image upload failed", "error");
        return;
      }

      const newMeal = {
        title: form.title.value.trim(),
        category: form.category.value,
        price: parseFloat(form.price.value),
        ingredients: form.ingredients.value.trim(),
        image: imgData.data.display_url,
        distributor: form.distributor.value.trim(),
        description: form.description.value.trim(),
        rating: parseFloat(form.rating.value),
        likes: 0,
        postTime: new Date(),
      };

      // Validate all fields before sending request
      if (
        !newMeal.title ||
        !newMeal.category ||
        isNaN(newMeal.price) ||
        !newMeal.ingredients ||
        !newMeal.image ||
        !newMeal.distributor ||
        !newMeal.description ||
        isNaN(newMeal.rating)
      ) {
        Swal.fire("Error", "Please fill all fields correctly.", "error");
        return;
      }

      const res = await axiosSecure.post("/upcoming-meals", newMeal);

      if (res.data.insertedId) {
        Swal.fire("Added!", "Upcoming meal added", "success");
        setShowModal(false);
        form.reset();
        refetch();
      }
    } catch (error) {
      console.error("Add meal error:", error);
      Swal.fire("Error", "Something went wrong while adding meal.", "error");
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
              <th>Category</th>
              <th>Price</th>
              <th>Likes</th>
              <th>Distributor</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {upcomingMeals.map((meal) => (
              <tr key={meal._id}>
                <td>{meal.title}</td>
                <td>{meal.category}</td>
                <td>${meal.price?.toFixed(2)}</td>
                <td>{meal.likes || 0}</td>
                <td>{meal.distributor}</td>
                <td>
                  <button
                    onClick={() => handlePublish(meal._id)}
                    className="btn btn-success btn-sm"
                  >
                    Publish
                  </button>
                </td>
              </tr>
            ))}
            {upcomingMeals.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center text-gray-500 py-4">
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
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-md overflow-y-auto max-h-[90vh]">
            <h3 className="text-xl font-bold mb-4">Add Upcoming Meal</h3>
            <form onSubmit={handleAddUpcomingMeal} className="space-y-3">
              <input
                name="title"
                placeholder="Title"
                className="input input-bordered w-full"
                required
              />

              <select
                name="category"
                className="select select-bordered w-full"
                required
                defaultValue=""
              >
                <option value="" disabled>
                  Select Category
                </option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
              </select>

              <input
                name="price"
                type="number"
                step="0.01"
                placeholder="Price"
                className="input input-bordered w-full"
                required
              />

              <input
                name="ingredients"
                placeholder="Ingredients (comma separated)"
                className="input input-bordered w-full"
                required
              />

              <input
                name="image"
                type="file"
                className="file-input file-input-bordered w-full"
                accept="image/*"
                required
              />

              <input
                name="distributor"
                defaultValue={user?.displayName || ""}
                placeholder="Distributor"
                className="input input-bordered w-full"
                required
              />

              <input
                name="rating"
                placeholder="Rating (0-5)"
                type="number"
                step="0.1"
                min="0"
                max="5"
                className="input input-bordered w-full"
                required
              />

              <textarea
                name="description"
                placeholder="Description"
                className="textarea textarea-bordered w-full"
                required
              />

              <div className="flex justify-end gap-2">
                <button type="submit" className="btn btn-primary btn-sm">
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn btn-error btn-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpcomingMeals;
