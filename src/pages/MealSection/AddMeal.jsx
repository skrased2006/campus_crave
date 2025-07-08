import React from "react";
import { useForm } from "react-hook-form";

import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const imageHostKey = import.meta.env.VITE_IMAGEBB_API_KEY;
const imageHostUrl = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;

const AddMeal = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

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
      body: formData
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
        reviews_count: 0
      };

      const dbRes = await axiosSecure.post("/meals", mealData);

      console.log(mealData)

      if (dbRes.data.insertedId) {
        Swal.fire("Success!", "Meal added successfully!", "success");
        reset();
      }
    }
  };


  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Add New Meal</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <input
          type="text"
          {...register("title", { required: true })}
          placeholder="Meal Title"
          className="input input-bordered w-full"
        />
        {errors.title && <span className="text-red-500">Title is required</span>}

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
        {errors.category && <span className="text-red-500">Category is required</span>}

        <input
          type="file"
          {...register("image", { required: true })}
          className="file-input file-input-bordered w-full"
        />
        {errors.image && <span className="text-red-500">Image is required</span>}

        <input
          type="text"
          {...register("ingredients", { required: true })}
          placeholder="Ingredients (comma separated)"
          className="input input-bordered w-full"
        />
        {errors.ingredients && <span className="text-red-500">Ingredients are required</span>}

        <textarea
          {...register("description", { required: true })}
          placeholder="Description"
          className="textarea textarea-bordered w-full"
        />
        {errors.description && <span className="text-red-500">Description is required</span>}

        <input
          type="number"
          step="0.01"
          {...register("price", { required: true })}
          placeholder="Price"
          className="input input-bordered w-full"
        />
        {errors.price && <span className="text-red-500">Price is required</span>}


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

        <button
          type="submit"
          className="btn bg-primary text-white hover:bg-primary/90 w-full"
        >
          Add Meal
        </button>
      </form>
    </div>
  );
};

export default AddMeal;
