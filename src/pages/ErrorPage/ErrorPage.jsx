import { Link } from "react-router";
import { Player } from "@lottiefiles/react-lottie-player";
import errorAnimation from "../../assets/animations/Page Not Found 404.json"; // তোমার animation path
import { motion } from "framer-motion";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <Player
          autoplay
          loop
          src={errorAnimation}
          style={{ height: "800px", width: "800px" }}
        />
      </motion.div>

      <motion.h2
        className="text-2xl md:text-3xl font-semibold text-gray-700 mb-3 mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
      </motion.h2>


      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-blue-600 text-white text-lg font-semibold rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
      >
        ⬅️ Back to Home
      </Link>

    </div>
  );
};

export default ErrorPage;
