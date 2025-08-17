import React from "react";
import { motion } from "framer-motion";
import BannerSection from "./BannerSection";
import MembershipSection from "./MembershipSection";
import ExtraSection from "./ExtraSection";
import MealTabs from "../MealSection/MealTabs";
import Testimonial from "./Testomonial";
import RecentMeals from "./RecentMeals/RecentMeals";
import Newsletter from "./Newsletter";
import HealthyEatingHabits from "./HealthyEating";

const Home = () => {
  // Common fast animation variant
  const fastSectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Slide-in variants for horizontal movement
  const slideLeft = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  const slideRight = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="space-y-10">
      {/* Banner */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fastSectionVariants}
      >
        <BannerSection />
      </motion.div>

      {/* Meal Tabs */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={fastSectionVariants}
        viewport={{ once: true, amount: 0.1 }}
      >
        <MealTabs />
      </motion.div>

      {/* Healthy Eating */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={fastSectionVariants}
        viewport={{ once: true, amount: 0.1 }}
        className="px-4"
      >
        <HealthyEatingHabits />
      </motion.div>

      {/* Membership Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={slideLeft}
        viewport={{ once: true, amount: 0.1 }}
      >
        <MembershipSection />
      </motion.div>

      {/* Testimonial Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={slideRight}
        viewport={{ once: true, amount: 0.1 }}
      >
        <Testimonial />
      </motion.div>

      {/* Recent Meals */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={fastSectionVariants}
        viewport={{ once: true, amount: 0.1 }}
      >
        <RecentMeals />
      </motion.div>

      {/* Extra Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1, transition: { duration: 0.5 } }}
        viewport={{ once: true, amount: 0.1 }}
      >
        <ExtraSection />
      </motion.div>

      {/* Newsletter */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={fastSectionVariants}
        viewport={{ once: true, amount: 0.1 }}
      >
        <Newsletter />
      </motion.div>
    </div>
  );
};

export default Home;
