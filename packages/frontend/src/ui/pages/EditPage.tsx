import React from 'react';
import { useParams } from 'react-router-dom';
import { EditAthletePageLayout } from '../layout/EditAthletePageLayout';
import { EditAthlete } from '../edit/EditAthlete';

const EditPage: React.FC = React.memo(() => {
  const { athleteId } = useParams<{ athleteId: string }>();

  return (
    <EditAthletePageLayout>
      <EditAthlete athleteId={athleteId}/>
    </EditAthletePageLayout>
  );
});

export { EditPage };
