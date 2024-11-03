import React from 'react';
import { Link } from 'react-router-dom';

const AddNewAthleteLink: React.FC = () => {
  return (
    <Link to="/athletes/new">
      <button>Add New Athlete</button>
    </Link>
  );
};

export default AddNewAthleteLink;
