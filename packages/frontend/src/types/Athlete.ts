import { Metric } from "./Metric";

export interface Athlete {
    id?: string;
    name: string;
    age: number;
    team: string;
    metrics?: Metric[];
  }