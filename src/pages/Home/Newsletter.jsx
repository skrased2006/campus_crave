import React from "react";
import { toast, Toaster } from "react-hot-toast";

const Newsletter = () => {
  const handleSubscribe = (e) => {
    e.preventDefault();
    toast.success("🎉 Subscribed successfully!");
  };

  return (
    <div className="bg-white py-16 px-6 lg:px-20 text-center">
      {/* Toast container */}
      <Toaster position="top-center" reverseOrder={false} />

      <h2 className="text-3xl font-bold text-gray-800 mb-4">
        🍴 Subscribe to Our Newsletter
      </h2>
      <p className="text-gray-600 max-w-xl mx-auto mb-8">
        Get the latest recipes, chef’s tips, and exclusive meal offers delivered
        straight to your inbox!
      </p>

      <form
        onSubmit={handleSubscribe}
        className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-xl mx-auto"
      >
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full sm:w-2/3 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />
        <button
          type="submit"
          className="px-6 py-3 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600 transition"
        >
          Subscribe
        </button>
      </form>

      <p className="text-sm text-gray-500 mt-4">
        We care about your privacy. No spam, only delicious updates!
      </p>
    </div>
  );
};

export default Newsletter;
