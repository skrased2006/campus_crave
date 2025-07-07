import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";

const Register = () => {
  const { createUser, updateUserProfile, googleSignIn } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photoURL = form.photoURL.value;
    const email = form.email.value;
    const password = form.password.value;

    if (password.length < 6) {
      return setError("Password must be at least 6 characters.");
    }

    try {
      const result = await createUser(email, password);
      await updateUserProfile(name, photoURL);
      form.reset();
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignup = async () => {
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
        {/* Left side image/info */}
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

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Full Name</label>
              <input type="text" name="name" required className="input input-bordered w-full" />
            </div>
            <div>
              <label className="block mb-1 font-medium">Photo URL</label>
              <input type="text" name="photoURL" className="input input-bordered w-full" />
            </div>
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input type="email" name="email" required className="input input-bordered w-full" />
            </div>
            <div>
              <label className="block mb-1 font-medium">Password</label>
              <input type="password" name="password" required className="input input-bordered w-full" />
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
