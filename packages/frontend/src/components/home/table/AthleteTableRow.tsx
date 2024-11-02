import { Athlete } from '../../../types/Athlete';
import AthleteInfo from './AthleteInfo';
import { AthleteTableActions } from './AthleteTableActions';

interface AthleteRowProps {
  athlete: Athlete;
}

export const AthleteRow: React.FC<AthleteRowProps> = ({ athlete }) => {
  return (
    <tr>
      <AthleteInfo athlete={athlete} />
      <AthleteTableActions athleteId={athlete.id!} />
    </tr>
  );
};
