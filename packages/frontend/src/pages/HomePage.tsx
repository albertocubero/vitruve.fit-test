import React from 'react';
import AddNewAthleteLink from '../components/home/buttons/AddNewAthleteLink';
import { AthleteList } from '../components/home/AthleteList';
// import { CustomerTable, Customer } from '../customTable';

const HomePage: React.FC = () => {
  return (
    <>
      <h1 className='text-3xl font-bold underline'>Athletes</h1>
      <AddNewAthleteLink />
      <AthleteList />
    </>
  );
};

// const customersData: Customer[] = [
//   {
//       company: 'Catalog',
//       website: 'catalogapp.io',
//       status: 'Customer',
//       about: { title: 'Content curating app', description: 'Brings all your news into one place' },
//       users: [
//           { avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80' },
//           { avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80' },
//       ],
//       extraUsers: 4,
//       licenseUse: 66,
//   },
//   // Agrega más clientes aquí
// ];


// const HomePage: React.FC = () => {
//   return (
//     <>
//     <CustomerTable customers={customersData} />;
//     </>
//   )
// };

export { HomePage };
