import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { Player } from "@lottiefiles/react-lottie-player";
import useAuth from "../../hooks/useAuth";

import foodAnim from "../../assets/animations/Login Leady.json"; // তোমার JSON animation path
import toast from "react-hot-toast";

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
      toast.success("🎉 Logged in successfully!");

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-primary/10 to-blue-100 px-4">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">

        {/* Left Side: Lottie Animation */}
        <div className="flex flex-col items-center justify-center bg-primary p-6 text-white">
          <Player
            autoplay
            loop
            src={foodAnim}
            style={{ height: '300px', width: '300px' }}
          />
          <h2 className="text-3xl font-bold mt-4">Campus Crave</h2>
          <p className="text-sm mt-2 max-w-xs text-center">
            Discover and review campus meals with student-powered feedback 🍽️
          </p>
        </div>

        {/* Right Side: Login Form */}
        <div className="p-10">
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
            <a href="/register" className="text-primary font-semibold hover:underline">
              Join Now
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
