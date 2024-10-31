export class Athlete {
  constructor(
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
}
