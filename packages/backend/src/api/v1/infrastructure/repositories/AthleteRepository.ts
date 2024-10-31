import { PrismaClient } from '@prisma/client';
import { Athlete } from '../../domain/entities/Athlete';
import { IAthleteRepository } from '../../domain/interfaces/IAthleteRepository';
import { IMetricRepository } from '../../domain/interfaces/IMetricRepository';
import { MetricRepository } from './MetricRepository';

const prisma = new PrismaClient();

export class AthleteRepository implements IAthleteRepository {
  private metricRepository: IMetricRepository;

  constructor(metricRepository: IMetricRepository) {
    this.metricRepository = metricRepository;
  }

  async create(athlete: Athlete): Promise<Athlete> {
    const createdAthlete = await prisma.athlete.create({
      data: {
        name: athlete.name,
        age: athlete.age,
        team: athlete.team,
      },
    });
    return new Athlete(createdAthlete.id, createdAthlete.name, createdAthlete.age, createdAthlete.team);
  }

  async findAll(): Promise<Athlete[]> {
    const athletes = await prisma.athlete.findMany();
    return athletes.map(
      (a) => new Athlete(a.id, a.name, a.age, a.team)
    );
  }

  async findById(id: string): Promise<Athlete | null> {
    const athlete = await prisma.athlete.findUnique({ where: { id } });
    return athlete ? new Athlete(athlete.id, athlete.name, athlete.age, athlete.team) : null;
  }

  async update(id: string, data: Partial<Athlete>): Promise<Athlete> {
    const updatedAthlete = await prisma.athlete.update({
      where: { id },
      data,
    });
    return new Athlete(updatedAthlete.id, updatedAthlete.name, updatedAthlete.age, updatedAthlete.team);
  }

  async delete(id: string): Promise<void> {
    await this.metricRepository.deleteMetricsByAthleteId(id);
    await prisma.athlete.delete({ where: { id } });
  }

  async exists(athleteId: string): Promise<boolean> {
    const athlete = await prisma.athlete.findUnique({ where: { id: athleteId } });
    return athlete !== null;
  }

  static createRepository(): IAthleteRepository {
    return new AthleteRepository(MetricRepository.createRepository());
  }
}

