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
  return (
    <div className="space-y-10">

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <BannerSection />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <MealTabs />
      </motion.div>
      <RecentMeals />

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <MembershipSection />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Testimonial></Testimonial>
      </motion.div>

 <HealthyEatingHabits/>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <ExtraSection />
      </motion.div>
      <Newsletter/>
  
    
    </div>
  );
};

export default Home;
