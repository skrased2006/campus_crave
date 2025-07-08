import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";

import axios from "axios";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";


const Register = () => {
  const { createUser, userUpadateProfile, googleSignIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosInstance = useAxiosSecure();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [uploading, setUploading] = useState(false);
  const [profilePic, setProfilePic] = useState("");
  const [error, setError] = useState("");

  const from = location.state?.from || "/";

  // Image Upload Handler
  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    if (!image) return;

    const formData = new FormData();
    formData.append("image", image);

    const uploadKey = import.meta.env.VITE_IMAGEBB_API_KEY;
    if (!uploadKey) {
      console.error("Missing image upload API key");
      alert("Missing image upload key. Please check your .env file.");
      return;
    }

    const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${uploadKey}`;

    try {
      setUploading(true);
      const res = await axios.post(imageUploadUrl, formData);
      const imageUrl = res.data.data.url;
      setProfilePic(imageUrl);
      setValue("photoURL", imageUrl);
    } catch (err) {
      console.error("Image upload failed:", err);
      alert("Image upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  // Form Submit
  const onSubmit = async (data) => {
    setError("");

    if (!data.photoURL) {
      alert("Please wait for the image to finish uploading.");
      return;
    }

    if (data.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      const result = await createUser(data.email, data.password);

      const userInfo = {
        email: data.email,
        name: data.name,
        role: "user",
        profilePic: data.photoURL,
        created_at: new Date().toISOString(),
        last_log_in: new Date().toISOString(),
      };

      console.log(result)
      await axiosInstance.post("/users", userInfo);

      const userProfile = {
        displayName: data.name,
        photoURL: profilePic,
      };

      await userUpadateProfile(userProfile);

      Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        text: "Welcome to our platform.",
      });
      console.log(userProfile)

      navigate(from, { replace: true });
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.message);
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: err.message,
      });
    }
  };

  const handleGoogleSignup = async () => {
    setError("");
    try {
      await googleSignIn();
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left side image */}
        <motion.div
          className="bg-primary text-white flex flex-col items-center justify-center p-10"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src="https://images.unsplash.com/photo-1606788075761-8e3d9e5c22b3?auto=format&fit=crop&w=900&q=80"
            alt="Campus Crave"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Right side form */}
        <motion.div
          className="p-10"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-center text-primary mb-6">
            Create an Account
          </h2>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block mb-1 font-medium">Full Name</label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                className="input input-bordered w-full"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Hidden photoURL */}
            <input
              type="hidden"
              {...register("photoURL", { required: "Profile image is required" })}
            />

            {/* Image Upload */}
            <div>
              <label className="block mb-1 font-medium">Upload Profile Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="file-input file-input-bordered w-full"
              />
              {uploading && (
                <p className="text-blue-500 text-sm mt-1">Uploading image...</p>
              )}
              {profilePic && (
                <img
                  src={profilePic}
                  alt="Profile Preview"
                  className="w-16 h-16 rounded-full mt-2 object-cover"
                />
              )}
              {errors.photoURL && (
                <p className="text-red-500 text-sm mt-1">{errors.photoURL.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="input input-bordered w-full"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block mb-1 font-medium">Password</label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="input input-bordered w-full"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            <button type="submit" className="btn btn-primary w-full mt-2">
              Register
            </button>
          </form>

          <div className="divider">OR</div>

          <button
            onClick={handleGoogleSignup}
            className="btn btn-outline w-full flex items-center justify-center gap-2"
          >
            <FcGoogle size={22} /> Sign up with Google
          </button>

          <p className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <a href="/login" className="text-primary font-semibold">
              Login Now
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
