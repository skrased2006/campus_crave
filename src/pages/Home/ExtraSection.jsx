import { FaStar, FaShieldAlt, FaUserGraduate } from "react-icons/fa";
import { motion } from "framer-motion";

const infos = [
  {
    title: "Why Campus Crave?",
    icon: <FaStar className="text-yellow-400 text-4xl" />,
    desc: "Campus Crave ensures students get fresh, balanced, and verified meals daily with a friendly review & request system built for campus life.",
  },
  {
    title: "How It Works?",
    icon: <FaShieldAlt className="text-blue-500 text-4xl" />,
    desc: "Log in, explore all available meals, request your favorite dishes, review what you eat, and unlock premium features by upgrading.",
  },
  {
    title: "Trusted by 1000+ Students",
    icon: <FaUserGraduate className="text-green-500 text-4xl" />,
    desc: "Campus Crave is loved and trusted by students from across the country — making hostel meals smarter, tastier, and more student-centric.",
  },
];

const ExtraSection = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          className="text-4xl font-extrabold text-primary mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Why Students Love Campus Crave
        </motion.h2>
        <p className="text-gray-600 mb-12 max-w-xl mx-auto">
          A smarter way to enjoy hostel meals with flexibility, control, and taste.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {infos.map((info, idx) => (
            <motion.div
              key={idx}
              className="bg-white rounded-xl shadow-lg border-t-4 p-6 hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              viewport={{ once: true }}
              style={{
                borderTopColor:
                  idx === 0
                    ? "#facc15"
                    : idx === 1
                      ? "#3b82f6"
                      : "#22c55e",
              }}
            >
              <div className="flex justify-center mb-4">{info.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{info.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{info.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExtraSection;
