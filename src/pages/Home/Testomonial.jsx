import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
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
  {
    id: 6,
    imageUrl: 'https://randomuser.me/api/portraits/men/6.jpg',
    name: 'Fahim Reza',
    role: 'Campus Craver',
    quote: 'Easy to use, modern, and fast. I never miss any meal update thanks to this platform.',
  },
  {
    id: 7,
    imageUrl: 'https://randomuser.me/api/portraits/women/7.jpg',
    name: 'Mehjabin Akter',
    role: 'Freelancer',
    quote: 'Being a freelancer, meal flexibility is important. CampusCrave helps me adjust my plans easily!',
  },
  {
    id: 8,
    imageUrl: 'https://randomuser.me/api/portraits/men/8.jpg',
    name: 'Tanvir Hossain',
    role: 'Student',
    quote: 'The UI is clean and responsive. It works great on mobile too!',
  },
  {
    id: 9,
    imageUrl: 'https://randomuser.me/api/portraits/women/9.jpg',
    name: 'Priya Sharma',
    role: 'Software Engineer',
    quote: 'Very optimized and smooth experience. I can manage everything with just a few clicks!',
  },
  {
    id: 10,
    imageUrl: 'https://randomuser.me/api/portraits/men/10.jpg',
    name: 'Kabir Rahman',
    role: 'Content Creator',
    quote: 'From giving reviews to managing my profile—everything feels intuitive. Loved it!',
  },
];


const Testimonial = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const changeSlide = useCallback((index) => {
    const safeIndex = (index + testimonials.length) % testimonials.length;
    setActiveIndex(safeIndex);
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (!isPaused) {
      intervalRef.current = setInterval(nextSlide, 5000);
    }
  }, [isPaused, nextSlide]);

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(nextSlide, 5000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPaused, nextSlide]);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-14">
      <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
        What Our Customers Say
      </h2>

      <div className="relative h-[400px] md:h-[360px] flex items-center justify-center overflow-hidden">
        <motion.div className="absolute w-full h-full flex justify-center items-center">
          {testimonials.map((item, index) => {
            const offset = index - activeIndex;
            const isActive = offset === 0;
            const visible = Math.abs(offset) <= 1;

            const animate = {
              x: `${offset * 100}%`,
              scale: isActive ? 1 : 0.85,
              opacity: visible ? 1 : 0,
              transition: { type: 'spring', stiffness: 250, damping: 25 },
            };

            return (
              <motion.div
                key={item.id}
                className="absolute w-full md:w-2/3 lg:w-1/2 h-[340px] rounded-2xl p-6 shadow-2xl bg-white dark:bg-neutral-900 backdrop-blur-md border border-gray-200 dark:border-white/10"
                style={{ transformStyle: 'preserve-3d' }}
                animate={animate}
                initial={false}
              >
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-pink-400 shadow-md"
                  />
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{item.role}</p>
                  <p className="text-gray-700 dark:text-gray-300 italic max-w-xs mx-auto">
                    "{item.quote}"
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Navigation Icons */}
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
            className={`w-3 h-3 rounded-full ${activeIndex === i ? 'bg-pink-500' : 'bg-gray-300 dark:bg-gray-600'
              }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
