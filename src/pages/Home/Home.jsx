import React from 'react';
import { motion } from 'framer-motion';
import BannerSection from './BannerSection';
import MembershipSection from './MembershipSection';
import ExtraSection from './ExtraSection';
import MealTabs from '../MealSection/MealTabs';
import Testimonial from './Testomonial';
import RecentMeals from './RecentMeals/RecentMeals';
import Newsletter from './Newsletter';
import HealthyEatingHabits from './HealthyEating';

const Home = () => {
  // Variants for section animation
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <div className="space-y-10">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <BannerSection />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={sectionVariants}
        viewport={{ once: true, amount: 0.3 }}
      >
        <MealTabs />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={sectionVariants}
        viewport={{ once: true, amount: 0.3 }}
      >
        <RecentMeals />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={{ hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8 } } }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <MembershipSection />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={{ hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8 } } }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <Testimonial />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={sectionVariants}
        viewport={{ once: true, amount: 0.3 }}
      >
        <HealthyEatingHabits />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1, transition: { duration: 0.8 } }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <ExtraSection />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={sectionVariants}
        viewport={{ once: true, amount: 0.3 }}
      >
        <Newsletter />
      </motion.div>
    </div>
  );
};

export default Home;

