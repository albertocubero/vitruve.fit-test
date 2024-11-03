import { IMetric } from './IMetric';

export interface IAthlete {
  id?: string;
  name: string;
  age: number;
  team: string;
  metrics?: IMetric[];
}
