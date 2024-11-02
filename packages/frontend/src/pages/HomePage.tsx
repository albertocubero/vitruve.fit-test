import React from 'react';
import AddNewAthleteLink from '../components/home/buttons/AddNewAthleteLink';
import { AthleteList } from '../components/home/AthleteList';

const HomePage: React.FC = () => {
  return (
    <>
      <h1>Athletes</h1>
      <AddNewAthleteLink />
      <AthleteList />
    </>
  );
};

export { HomePage };
