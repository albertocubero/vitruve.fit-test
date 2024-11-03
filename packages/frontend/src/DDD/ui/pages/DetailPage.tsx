import React from 'react';
import { useParams } from 'react-router-dom';
import AthleteDetail from '../detail/AthleteDetail';
import BackToHomeLink from '../common/BackToHomeLink';

const DetailPage: React.FC = () => {
  const { athleteId } = useParams<{ athleteId: string }>();

  return (
    <>
      <BackToHomeLink />
      <h1>Athlete Details: </h1>
      <AthleteDetail athleteId={athleteId} />
    </>
  );
};

export { DetailPage };
