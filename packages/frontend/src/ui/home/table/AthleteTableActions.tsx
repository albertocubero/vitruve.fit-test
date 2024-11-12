import React from 'react';
import DeleteConfirmationButton from './DeleteConfirmationButton';
import AthleteEditLink from '../buttons/AthleteEditLink';

interface AthleteActionsProps {
  athleteId: string;
}

const AthleteTableActions: React.FC<AthleteActionsProps> = React.memo(({ athleteId }) => (
  <div className="px-4 py-3 text-sm whitespace-nowrap w-1/4 text-right">
    <AthleteEditLink athleteId={athleteId} />
    <DeleteConfirmationButton athleteId={athleteId}/>
  </div>
));

export { AthleteTableActions };
