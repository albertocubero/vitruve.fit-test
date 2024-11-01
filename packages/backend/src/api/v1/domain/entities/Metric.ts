export interface IMetric {
  id?: string 
  athleteId: string;
  metricType: string;
  value: number;
  unit: string;
  timestamp?: Date
}

export class Metric {
  private constructor(
    public readonly id: string | undefined,
    public athleteId: string,
    public metricType: string,
    public value: number,
    public unit: string,
    public timestamp?: Date
  ) {}

  static create({
    id,
    athleteId,
    metricType,
    value,
    unit,
    timestamp
  }: IMetric): Metric {
    return new Metric(id ?? undefined, athleteId, metricType, value, unit, timestamp);
  }
}
