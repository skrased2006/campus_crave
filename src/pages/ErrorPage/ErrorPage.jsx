import { Link } from "react-router";
import { motion } from "framer-motion";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 text-center">
      <motion.h1
        className="text-6xl md:text-8xl font-extrabold text-primary mb-4"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        404
      </motion.h1>

      <motion.h2
        className="text-2xl md:text-3xl font-semibold text-gray-700 mb-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Page Not Found
      </motion.h2>

      <p className="text-gray-500 mb-6 max-w-md">
        Sorry! The page you're looking for doesn’t exist or has been moved.
      </p>

      <Link to="/" className="btn btn-primary">
        ⬅️ Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;
