import { Athlete } from '../../types/Athlete';
import AthleteTableActions from './AthleteTableActions';

interface AthleteRowProps {
  athlete: Athlete;
  onDelete: (id: string) => void;
}

export const AthleteRow: React.FC<AthleteRowProps> = ({ athlete, onDelete }) => (
  <tr>
    <td>{athlete.name}</td>
    <td>{athlete.age}</td>
    <td>{athlete.team}</td>
    <AthleteTableActions athleteId={athlete.id!} onDelete={() => onDelete(athlete.id!)} />
  </tr>
);