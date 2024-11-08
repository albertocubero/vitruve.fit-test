export interface IAthlete {
  id?: string;
  name: string;
  age: number;
  team: string;
}

export class Athlete implements IAthlete {
  private constructor(
    public readonly id: string | undefined,
    public name: string,
    public age: number,
    public team: string
  ) {}

  static create({id, name, age, team}: IAthlete): Athlete {
    return new Athlete(id ?? undefined, name, age, team);
  }
}
