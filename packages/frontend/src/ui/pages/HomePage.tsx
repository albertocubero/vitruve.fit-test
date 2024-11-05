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

// const customersData: IAthlete[] = [
//   {
//     id: "1",
//     name: "ee",
//     age: 25,
//     team: "ee"
//   }
// ];

// import { CustomerTable } from '../../CustomTable';
// import { IAthlete } from '../../domain/types/IAthlete';

// const HomePage: React.FC = () => {
//   return (
//     <HomePageLayout>
//       <CustomerTable customers={customersData} />
//     </HomePageLayout>
//   );
// };

export { HomePage };
