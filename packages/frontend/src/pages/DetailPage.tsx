import React from 'react';
import { useParams } from 'react-router-dom';
import AthleteDetail from '../components/detail/AthleteDetail';
import BackToHomeLink from '../components/BackToHomeLink';

const DetailPage: React.FC = () => {
  const { athleteId } = useParams<{ athleteId: string }>();
  
  return (
    <div>
      <BackToHomeLink />
      <h1>Athlete Details: </h1>
      <AthleteDetail athleteId={athleteId} />
    </div>
  );
};

export { DetailPage };
