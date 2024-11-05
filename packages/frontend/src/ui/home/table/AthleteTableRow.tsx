import { IAthlete } from '../../../domain/types/IAthlete';
import AthleteInfo from './AthleteInfo';
import { AthleteTableActions } from './AthleteTableActions';

interface AthleteRowProps {
  athlete: IAthlete;
}

export const AthleteRow: React.FC<AthleteRowProps> = ({ athlete }) => {
  return (
    <div className="flex text-sm font-medium border-b border-gray-200 dark:border-gray-700">
      <AthleteInfo athlete={athlete} />
      <AthleteTableActions athleteId={athlete.id!} />
    </div>
  );
};
