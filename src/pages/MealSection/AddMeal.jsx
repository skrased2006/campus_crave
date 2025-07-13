import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const imageHostKey = import.meta.env.VITE_IMAGEBB_API_KEY;
const imageHostUrl = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;

const AddMeal = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [preview, setPreview] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);

    const res = await fetch(imageHostUrl, {
      method: "POST",
      body: formData,
    });

    const imgData = await res.json();

    if (imgData.success) {
      const mealData = {
        title: data.title,
        category: data.category,
        image: imgData.data.display_url,
        ingredients: data.ingredients,
        description: data.description,
        price: parseFloat(data.price),
        postTime: new Date().toISOString(),
        distributor: user.displayName,
        email: user.email,
        rating: 0,
        likes: 0,
        reviews_count: 0,
      };

      const dbRes = await axiosSecure.post("/meals", mealData);

      if (dbRes.data.insertedId) {
        Swal.fire("Success!", "Meal added successfully!", "success");
        reset();
        setPreview(null);
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-3xl font-semibold mb-8 text-center text-primary">🍽️ Add New Meal</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-6">
        {/* Left Side Inputs */}
        <div className="space-y-4">
          <div>
            <input
              type="text"
              {...register("title", { required: true })}
              placeholder="Meal Title"
              className="input input-bordered w-full"
            />
            {errors.title && <span className="text-red-500 text-sm">Title is required</span>}
          </div>

          <div>
            <select
              {...register("category", { required: true })}
              className="select select-bordered w-full"
              defaultValue=""
            >
              <option value="" disabled>Select Category</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
            </select>
            {errors.category && <span className="text-red-500 text-sm">Category is required</span>}
          </div>

          <div>
            <input
              type="file"
              {...register("image", { required: true })}
              accept="image/*"
              className="file-input file-input-bordered w-full"
              onChange={(e) => setPreview(URL.createObjectURL(e.target.files[0]))}
            />
            {errors.image && <span className="text-red-500 text-sm">Image is required</span>}
          </div>

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-40 object-cover rounded border"
            />
          )}

          <div>
            <input
              type="text"
              {...register("ingredients", { required: true })}
              placeholder="Ingredients (comma separated)"
              className="input input-bordered w-full"
            />
            {errors.ingredients && <span className="text-red-500 text-sm">Ingredients required</span>}
          </div>
        </div>

        {/* Right Side Inputs */}
        <div className="space-y-4">
          <div>
            <textarea
              {...register("description", { required: true })}
              placeholder="Meal Description"
              className="textarea textarea-bordered w-full"
              rows={5}
            />
            {errors.description && <span className="text-red-500 text-sm">Description is required</span>}
          </div>

          <div>
            <input
              type="number"
              step="0.01"
              {...register("price", { required: true })}
              placeholder="Price (e.g. 5.99)"
              className="input input-bordered w-full"
            />
            {errors.price && <span className="text-red-500 text-sm">Price is required</span>}
          </div>

          <input
            type="text"
            value={user?.displayName}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />

          <input
            type="email"
            value={user?.email}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        {/* Full-width Button */}
        <div className="md:col-span-2">
          <button
            type="submit"
            className="btn bg-primary text-white w-full hover:bg-primary/90"
          >
            ➕ Add Meal
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMeal;
