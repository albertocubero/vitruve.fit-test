import React from 'react';
import { HomePageLayout } from '../layout/HomePageLayout';
import { AthleteList } from '../home/AthleteList';

const HomePage: React.FC = () => {
  return (
    <HomePageLayout>
      <AthleteList />
    </HomePageLayout>
  );
};

export { HomePage };
