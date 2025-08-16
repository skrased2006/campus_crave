import React from "react";

const HealthyEatingHabits = () => {
  const blogs = [
    {
      id: 1,
      title: "🥦 Eat More Greens",
      date: "Wed Jul 23 2025",
      rating: 5,
      image: "https://source.unsplash.com/600x400/?vegetables",
      description:
        "Vegetables are packed with essential vitamins, minerals, and dietary fiber. Adding greens like spinach, broccoli, and kale to your meals not only strengthens your immune system but also supports long-term health.",
    },
    {
      id: 2,
      title: "💧 Stay Hydrated",
      date: "Sat Apr 05 2025",
      rating: 4,
      image: "https://source.unsplash.com/600x400/?water",
      description:
        "Water is the fuel your body needs to function properly. Staying hydrated improves digestion, boosts energy, and even keeps your skin glowing.",
    },
    {
      id: 3,
      title: "🍊 Balance Your Diet",
      date: "Thu Feb 22 2024",
      rating: 5,
      image: "https://source.unsplash.com/600x400/?healthy-food",
      description:
        "A healthy diet isn’t about eliminating foods—it’s about balance. Include proteins, healthy fats, and carbohydrates in the right portions.",
    },
  ];

  return (
    <section className="py-16 bg-pink-100">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-2">
          Success Story
        </h2>
        <h3 className="text-5xl font-extrabold text-center text-gray-900 mb-12">
          Blog & Articles
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-64 object-cover rounded-t-2xl"
              />
              <div className="p-6 flex flex-col justify-between">
                <p className="text-sm text-pink-700 font-medium mb-2">
                  {blog.date}
                </p>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  {blog.title}
                </h3>
                <div className="flex items-center text-yellow-500 mb-3">
                  {"⭐".repeat(blog.rating)}
                </div>
                <p className="text-gray-600 mb-6">{blog.description}</p>
                <button className="bg-black text-white px-5 py-2 rounded hover:bg-gray-800 transition">
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HealthyEatingHabits;
