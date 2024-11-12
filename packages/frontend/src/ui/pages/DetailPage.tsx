import React from 'react';
import { useParams } from 'react-router-dom';
import AthleteDetail from '../detail/AthleteDetail';
import { DetailAthletePageLayout } from '../layout/DetailAthletePageLayout';

const DetailPage: React.FC = React.memo(() => {
  const { athleteId } = useParams<{ athleteId: string }>();

  return (
    <DetailAthletePageLayout>
      <AthleteDetail athleteId={athleteId} />
    </DetailAthletePageLayout>
  );
});

export { DetailPage };
