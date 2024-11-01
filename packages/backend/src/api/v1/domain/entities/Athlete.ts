export interface IAthlete {
  name: string;
  age: number;
  team: string;
}

export class Athlete {
  private constructor(
    public readonly id: string,
    public name: string,
    public age: number,
    public team: string
  ) {}

  toString() {
    return {
      id: this.id,
      name: this.name,
      age: this.age,
      team: this.team,
    };
  }

  static create(id: string, name: string, age: number, team: string): Athlete {
    return new Athlete(id, name, age, team);
  }
}
