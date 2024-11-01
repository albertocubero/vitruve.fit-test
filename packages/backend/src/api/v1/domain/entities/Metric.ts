export interface IMetric {
  athleteId: string;
  metricType: string;
  value: number;
  unit: string;
}

export class Metric {
  private constructor(
    public readonly id: string,
    public athleteId: string,
    public metricType: string,
    public value: number,
    public unit: string,
    public timestamp: Date
  ) {}

  toString() {
    return {
      athleteId: this.athleteId,
      metricType: this.metricType,
      value: this.value,
      unit: this.unit,
      timestamp: this.timestamp,
    };
  }

  static create(
    id: string,
    athleteId: string,
    metricType: string,
    value: number,
    unit: string,
    timestamp: Date
  ): Metric {
    return new Metric(id, athleteId, metricType, value, unit, timestamp);
  }
}
