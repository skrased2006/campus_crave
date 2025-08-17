import React from "react";
import { motion } from "framer-motion";

const HealthyEatingHabits = () => {
  const blogs = [
    {
      id: 1,
      title: "🥦 Boost Your Meals with Greens",
      image: "https://i.ibb.co.com/DXtMbtw/cliffer-rebelo-Ud-Ls-LK-KFLw-unsplash.jpg",
      description:
        "Incorporate fresh vegetables like spinach, kale, and broccoli into your daily meals. They are rich in vitamins, minerals, and antioxidants that support your immunity, digestion, and overall energy. Make your plate colorful for both taste and nutrition.",
    },
 {
  id: 2,
  title: "💧 Juicy Hydration for Better Digestion",
  image: "https://i.ibb.co.com/4nV93F0v/createasea-JBe-C3-YVkm-Fw-unsplash.jpg", 
  description:
    "Fresh fruit juices and water-rich foods are perfect companions to your meals. They aid digestion, boost energy, and keep your skin glowing. Include juicy fruits like watermelon, oranges, and berries to enhance flavor and hydration naturally.",
},


    {
      id: 3,
      title: "🍊 Balance Meals for Maximum Health",
      image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80",
      description:
        "A balanced meal includes lean proteins, whole grains, healthy fats, and plenty of fruits and vegetables. Avoid processed foods and sugary snacks. Consistently choosing balanced meals improves energy, focus, and overall wellbeing.",
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <section className="py-20 ">
      {/* Header */}
      <div className="max-w-5xl mx-auto px-6 text-center mb-16">
        <h2 className="text-4xl font-bold text-blue-700 mb-4">
          Healthy Eating, Happy Life
        </h2>
        <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
          Simple Tips to Make Your Meals Nutritious & Delicious
        </h3>
        <p className="text-gray-700 text-lg md:text-xl max-w-3xl mx-auto">
          Explore our easy-to-follow meal tips and articles curated for food lovers. Learn how to prepare balanced meals, incorporate fresh ingredients, and enjoy every bite while boosting your health.
        </p>
      </div>

      {/* Blog Cards */}
      <div className="max-w-7xl mx-auto px-6 flex flex-col gap-20">
        {blogs.map((blog, index) => (
          <motion.div
            key={blog.id}
            className={`flex flex-col md:flex-row items-center gap-6 ${
              index % 2 !== 0 ? "md:flex-row-reverse" : ""
            }`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={cardVariants}
          >
            {/* Image */}
            <div className="w-full md:w-1/2 overflow-hidden rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-[28rem] object-cover rounded-2xl"
              />
            </div>

            {/* Middle border */}
            <div className="hidden md:block w-px bg-blue-300 h-[28rem]"></div>

            {/* Details */}
            <div className="md:w-1/2 flex flex-col justify-center px-2 md:px-6">
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                {blog.title}
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                {blog.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HealthyEatingHabits;
