import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaPause, FaPlay } from 'react-icons/fa';

const testimonials = [
  {
    id: 1,
    imageUrl: 'https://randomuser.me/api/portraits/women/1.jpg',
    name: 'Sara Ali',
    role: 'Premium Member',
    quote: 'After switching to premium, I could feel the difference in food quality. Everything is well managed!',
  },
  {
    id: 2,
    imageUrl: 'https://randomuser.me/api/portraits/men/2.jpg',
    name: 'John Smith',
    role: 'Hostel Admin',
    quote: 'Managing student meals and feedback has become very easy. Great dashboard experience!',
  },
  {
    id: 3,
    imageUrl: 'https://randomuser.me/api/portraits/women/3.jpg',
    name: 'Ayesha Khan',
    role: 'Regular User',
    quote: 'I can request meals and give feedback without any hassle. Super helpful!',
  },
  {
    id: 4,
    imageUrl: 'https://randomuser.me/api/portraits/men/4.jpg',
    name: 'Rahim Uddin',
    role: 'Meal Moderator',
    quote: 'Love the voting system for upcoming meals. Gives us more control and choice!',
  },
  {
    id: 5,
    imageUrl: 'https://randomuser.me/api/portraits/women/5.jpg',
    name: 'Nora Das',
    role: 'Student',
    quote: 'The food review and premium features are amazing. I feel more connected with my hostel now.',
  },
];

const Testimonial = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const changeSlide = useCallback(
    (index) => {
      const safeIndex = (index + testimonials.length) % testimonials.length;
      setActiveIndex(safeIndex);
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (!isPaused) intervalRef.current = setInterval(nextSlide, 5000);
    },
    [isPaused, nextSlide]
  );

  useEffect(() => {
    if (!isPaused) intervalRef.current = setInterval(nextSlide, 5000);
    return () => clearInterval(intervalRef.current);
  }, [isPaused, nextSlide]);

  // Get 3 testimonials starting from activeIndex
  const visibleTestimonials = [
    testimonials[activeIndex],
    testimonials[(activeIndex + 1) % testimonials.length],
    testimonials[(activeIndex + 2) % testimonials.length],
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-14">
      <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-3">
        What Our Customers Say
      </h2>
      <p className="text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10">
        Thousands of students, hostel admins, and food lovers trust us every day. 
        Here’s what they think about our meals and services.
      </p>

      <div className="relative flex items-center justify-center overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          <AnimatePresence initial={false}>
            {visibleTestimonials.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 100 }}  // 👉 ডান দিক থেকে আসবে
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.6 }}
                className="rounded-2xl p-6 shadow-2xl bg-white dark:bg-neutral-900 border border-gray-200 dark:border-white/10 flex flex-col items-center text-center"
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-pink-400 shadow-md mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  {item.role}
                </p>
                <p className="text-gray-700 dark:text-gray-300 italic">
                  "{item.quote}"
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={() => changeSlide(activeIndex - 1)}
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
        >
          <FaChevronLeft className="w-5 h-5 text-gray-700 dark:text-white" />
        </button>
        <button
          onClick={() => setIsPaused((prev) => !prev)}
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
        >
          {isPaused ? (
            <FaPlay className="w-4 h-4 text-gray-700 dark:text-white" />
          ) : (
            <FaPause className="w-4 h-4 text-gray-700 dark:text-white" />
          )}
        </button>
        <button
          onClick={() => changeSlide(activeIndex + 1)}
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
        >
          <FaChevronRight className="w-5 h-5 text-gray-700 dark:text-white" />
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => changeSlide(i)}
            className={`w-3 h-3 rounded-full ${
              activeIndex === i ? 'bg-pink-500' : 'bg-gray-300 dark:bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
