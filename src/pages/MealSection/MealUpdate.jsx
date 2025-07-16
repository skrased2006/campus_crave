// MealUpdate.jsx
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const imageHostKey = import.meta.env.VITE_IMAGEBB_API_KEY;
const imageHostUrl = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;

const MealUpdate = ({ mealData, closeModal, refetch }) => {
  const [preview, setPreview] = useState(mealData.image);
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: mealData.title,
      category: mealData.category,
      ingredients: mealData.ingredients,
      description: mealData.description,
      price: mealData.price,
    },
  });

  const onSubmit = async (data) => {
    let updatedImage = mealData.image;

    // If new image selected
    if (data.image.length > 0) {
      const formData = new FormData();
      formData.append("image", data.image[0]);

      const res = await fetch(imageHostUrl, {
        method: "POST",
        body: formData,
      });

      const imgData = await res.json();
      if (imgData.success) {
        updatedImage = imgData.data.display_url;
      }
    }

    const updatedMeal = {
      title: data.title,
      category: data.category,
      image: updatedImage,
      ingredients: data.ingredients,
      description: data.description,
      price: parseFloat(data.price),
    };

    const res = await axiosSecure.put(`/meals/${mealData._id}`, updatedMeal);
    if (res.data.modifiedCount > 0) {
      Swal.fire("Updated!", "Meal updated successfully!", "success");
      closeModal();
      refetch();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-3xl">
        <h2 className="text-xl font-semibold mb-4 text-center">Update Meal</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              {...register("title", { required: true })}
              className="input input-bordered w-full"
              placeholder="Meal Title"
            />
            {errors.title && <span className="text-red-500">Title required</span>}
          </div>

          <div>
            <select {...register("category")} className="select select-bordered w-full">
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
            </select>
          </div>

          <div>
            <input
              type="file"
              {...register("image")}
              className="file-input file-input-bordered w-full"
              onChange={(e) => setPreview(URL.createObjectURL(e.target.files[0]))}
            />
          </div>

          {preview && (
            <div className="md:col-span-2">
              <img src={preview} className="w-full h-40 object-cover rounded-lg border" />
            </div>
          )}

          <div className="md:col-span-2">
            <input
              type="text"
              {...register("ingredients")}
              className="input input-bordered w-full"
              placeholder="Ingredients"
            />
          </div>

          <div className="md:col-span-2">
            <textarea
              {...register("description")}
              className="textarea textarea-bordered w-full"
              placeholder="Description"
              rows={3}
            />
          </div>

          <div className="md:col-span-2">
            <input
              type="number"
              step="0.01"
              {...register("price")}
              className="input input-bordered w-full"
              placeholder="Price"
            />
          </div>

          <div className="md:col-span-2 flex justify-between mt-4">
            <button type="submit" className="btn bg-primary text-white">
              Update Meal
            </button>
            <button onClick={closeModal} type="button" className="btn btn-ghost">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MealUpdate;
