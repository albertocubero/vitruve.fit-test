import React from 'react';
import { CreateAthletePageLayout } from '../layout/CreateAthletePageLayout';
import CreateAthlete from '../create/CreateAthlete';

const NewPageComponent: React.FC = () => {
  return (
    <CreateAthletePageLayout>
      <CreateAthlete />
    </CreateAthletePageLayout>
  );
};

export const CreatePage = React.memo(NewPageComponent);
