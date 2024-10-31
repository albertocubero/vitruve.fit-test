export class Metric {
    constructor(
      public readonly id: string,
      public athleteId: string,
      public metricType: string,
      public value: number,
      public unit: string,
      public timestamp: Date
    ) {}

    toString () {
      return {
        athleteId: this.athleteId,
        metricType: this.metricType,
        value: this.value,
        unit: this.unit,
        timestamp: this.timestamp,
      }
    }
  }
  