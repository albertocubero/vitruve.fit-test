import React from 'react';
import { Link } from 'react-router-dom';
import DeleteConfirmationButton from './DeleteConfirmationButton';

interface AthleteActionsProps {
  athleteId: string;
  onDelete: () => void;
}

const AthleteTableActions: React.FC<AthleteActionsProps> = ({
  athleteId,
  onDelete,
}) => (
  <td>
    <Link to={`/athletes/${athleteId}`}>View</Link>
    <Link to={`/athletes/edit/${athleteId}`}>Edit</Link>
    <DeleteConfirmationButton onConfirm={onDelete} />
  </td>
);

export default AthleteTableActions;
