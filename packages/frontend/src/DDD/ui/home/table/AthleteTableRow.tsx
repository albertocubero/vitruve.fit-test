import { IAthlete } from '../../../domain/types/IAthlete';
import AthleteInfo from './AthleteInfo';
import { AthleteTableActions } from './AthleteTableActions';

interface AthleteRowProps {
  athlete: IAthlete;
}

export const AthleteRow: React.FC<AthleteRowProps> = ({ athlete }) => {
  return (
    <tr>
      <AthleteInfo athlete={athlete} />
      <AthleteTableActions athleteId={athlete.id!} />
    </tr>
  );
};
