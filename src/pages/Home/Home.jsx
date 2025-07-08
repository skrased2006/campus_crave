import React from 'react';
import BannerSection from './BannerSection';
import MembershipSection from './MembershipSection';
import ExtraSection from './ExtraSection';
import MealTabs from '../MealSection/MealTabs';

const Home = () => {
  return (
    <div>
      <BannerSection></BannerSection>
      <MealTabs></MealTabs>
      <MembershipSection></MembershipSection>
      <ExtraSection></ExtraSection>

    </div>
  );
};

export default Home;