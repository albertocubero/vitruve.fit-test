import React from 'react';
// import AddNewAthleteLink from '../home/buttons/AddNewAthleteLink';
// import { AthleteList } from '../home/AthleteList';

// const HomePage: React.FC = () => {
//   return (
//     <HomePageLayout>
//       <>
//         <h1 className="text-3xl font-bold underline">Athletes</h1>
//         <AddNewAthleteLink />
//         <AthleteList />
//       </>
//     </HomePageLayout>
//   );
// };

const customersData: IAthlete[] = [
  {
    id: "1",
    name: "John Doe John Doe John Doe John DoeJohnDoe John Doe John Doe",
    age: 25,
    team: "Eagles Eagles Eagles Eagles Eagles EaglesEaglesE"
  }
];

import { HomePageLayout } from '../layout/HomePageLayout';
import { CustomerTable } from '../../CustomTable';
import { IAthlete } from '../../domain/types/IAthlete';

const HomePage: React.FC = () => {
  return (
    <HomePageLayout>
      <CustomerTable customers={customersData} />
    </HomePageLayout>
  );
};

export { HomePage };
