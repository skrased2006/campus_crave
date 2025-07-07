import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const { signIn, signInwithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await signIn(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInwithGoogle();
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left Side: Logo + About */}
        <motion.div
          className="bg-primary text-white flex flex-col items-center justify-center p-10"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src="https://i.ibb.co/wZX5dygz/images.png"
            alt="Campus Crave"
            className="w-[480px] h-[200px] mb-4 object-cover"
          />

          <h1 className="text-3xl font-bold mb-2">Campus Crave</h1>
          <p className="text-center text-sm max-w-xs leading-relaxed">
            Discover and review your daily campus meals. Powered by students,
            for students. Your feedback matters 🍽️
          </p>
        </motion.div>

        {/* Right Side: Login Form */}
        <motion.div
          className="p-10"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-center text-primary mb-6">
            Login to Your Account
          </h2>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                name="email"
                className="input input-bordered w-full"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Password</label>
              <input
                type="password"
                name="password"
                className="input input-bordered w-full"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-full mt-2">
              Login
            </button>
          </form>

          <div className="divider">OR</div>

          <button
            onClick={handleGoogleLogin}
            className="btn btn-outline w-full flex items-center justify-center gap-2"
          >
            <FcGoogle size={22} /> Continue with Google
          </button>

          <p className="mt-4 text-center text-sm">
            Don’t have an account?{" "}
            <a href="/register" className="text-primary font-semibold">
              Join Now
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
