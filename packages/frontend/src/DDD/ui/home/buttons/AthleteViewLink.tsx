import React from 'react';
import { Link } from 'react-router-dom';

interface AthleteViewLinkProps {
  athleteId: string;
}

const AthleteViewLink: React.FC<AthleteViewLinkProps> = ({ athleteId }) => {
  return (
    <Link to={`/athletes/${athleteId}`}>View</Link>
  );
};

export default AthleteViewLink;
