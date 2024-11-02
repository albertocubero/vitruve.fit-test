import React from 'react';
import DeleteConfirmationButton from './DeleteConfirmationButton';
import AthleteViewLink from './buttons/AthleteViewLink';
import AthleteEditLink from './buttons/AthleteEditLink';

interface AthleteActionsProps {
  athleteId: string;
}

const AthleteTableActions: React.FC<AthleteActionsProps> = ({ athleteId }) => (
  <td>
    <AthleteViewLink athleteId={athleteId} />
    <AthleteEditLink athleteId={athleteId} />
    <DeleteConfirmationButton athleteId={athleteId}/>
  </td>
);

export { AthleteTableActions };
