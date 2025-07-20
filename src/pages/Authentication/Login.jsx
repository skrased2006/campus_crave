import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { Player } from "@lottiefiles/react-lottie-player";
import useAuth from "../../hooks/useAuth";

import foodAnim from "../../assets/animations/Login Leady.json";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Login = () => {
  const { signIn, signInwithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure()
  const from = location.state || "/";

  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await signIn(email, password);
      toast.success("🎉 Logged in successfully!");

      navigate(from);
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInwithGoogle();
      const user = result.user;

      const userInfo = {
        name: user.displayName,
        email: user.email,
        profilePic: user.photoURL,
        role: 'user',
        created_at: new Date().toISOString(),
        last_log_in: new Date().toISOString(),
      };

      // 🔍 Check if user already exists
      const { data: existingUser } = await axiosSecure.get(`/users/${user.email}`);

      if (!existingUser) {
        // ❗User does not exist, so save
        await axiosSecure.post("/users", userInfo);
      } else {
        // ✅ Update last login if needed (optional)
        await axiosSecure.patch(`/users/${user.email}`, {
          last_log_in: new Date().toISOString()
        });
      }

      toast.success("🎉 Google login successful!");
      navigate(from);

    } catch (err) {
      console.error(err.message);
      toast.error("❌ Google login failed");
    }
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-primary/10 to-blue-100 px-4">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">


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
