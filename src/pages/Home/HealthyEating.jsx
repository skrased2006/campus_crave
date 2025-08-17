import React from "react";
import { motion } from "framer-motion";

const HealthyEatingHabits = () => {
  const blogs = [
    {
      id: 1,
      title: "🥦 Eat More Greens",
      image: "https://i.ibb.co/8nx5LPvr/zoshua-colah-lu-KV6avowg0-unsplash.jpg",
      description:
        "Consuming a wide variety of fresh vegetables daily enhances your health and vitality. Leafy greens such as spinach, kale, and broccoli are packed with essential vitamins, minerals, and antioxidants that strengthen immunity, improve digestion, and boost energy levels. Aim to make your meals colorful for maximum nutritional benefits.",
    },
    {
      id: 2,
      title: "💧 Stay Hydrated",
      image: "https://i.ibb.co/xK50srMX/gustavo-scafeli-ai-Jy-Qjy-I4c-unsplash.jpg",
      description:
        "Water is fundamental for optimal body functions including nutrient transport, temperature regulation, and waste elimination. Adequate hydration enhances cognitive performance, maintains radiant skin, and supports weight management. Drink at least 8 glasses daily and include water-rich fruits and vegetables in your diet.",
    },
    {
      id: 3,
      title: "🍊 Balance Your Diet",
      image: "https://i.ibb.co/4ZBdMmxF/toan-le-B0-AQU802-AN0-unsplash.jpg",
      description:
        "Achieving a balanced diet is key to long-term wellness. Include proteins, healthy fats, complex carbohydrates, and plenty of fruits and vegetables in your meals. Reduce reliance on processed foods and sugary snacks. Consistent dietary improvements contribute to better energy, mood, and overall health.",
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  return (
    <section className="py-16 bg-white">
      {/* Header */}
      <div className="max-w-5xl mx-auto px-6 text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Healthy Living Insights
        </h2>
        <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
          Expert Tips & Practical Guides for a Healthier Lifestyle
        </h3>
        <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto">
          Discover insightful articles and tips curated to help you maintain a balanced diet, stay hydrated, and lead a healthier, more energetic life. Implementing simple daily habits can bring long-term wellness benefits.
        </p>
      </div>

      {/* Blog Cards */}
      <div className="max-w-7xl mx-auto px-6 flex flex-col gap-16">
        {blogs.map((blog, index) => (
          <motion.div
            key={blog.id}
            className={`flex flex-col md:flex-row ${
              index % 2 !== 0 ? "md:flex-row-reverse" : ""
            } items-center gap-6`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={cardVariants}
          >
            {/* Image */}
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full md:w-1/2 h-[28rem] object-cover rounded-2xl shadow-lg"
            />

            {/* Middle border */}
            <div className="hidden md:block w-px bg-gray-300 h-[28rem]"></div>

            {/* Details */}
            <div className="md:w-1/2 flex flex-col justify-center">
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                {blog.title}
              </h3>
              <p className="text-gray-700 text-lg">{blog.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HealthyEatingHabits;
