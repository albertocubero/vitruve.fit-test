import React from 'react';
import { Link } from 'react-router-dom';

interface AthleteEditLinkProps {
  athleteId: string;
}

const AthleteEditLink: React.FC<AthleteEditLinkProps> = ({ athleteId }) => {
  return (
    <Link to={`/athletes/edit/${athleteId}`}>Edit</Link>
  );
};

export default AthleteEditLink;
