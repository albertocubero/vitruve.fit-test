import { PrismaClient } from '@prisma/client';
import { Athlete, IAthlete } from '../../domain/entities/Athlete';
import { IAthleteRepository } from '../../domain/interfaces/IAthleteRepository';
import { IMetricRepository } from '../../domain/interfaces/IMetricRepository';
import { MetricRepository } from './MetricRepository';

const prisma = new PrismaClient();

export class AthleteRepository implements IAthleteRepository {
  private static instance: IAthleteRepository;
  private metricRepository: IMetricRepository;

  private constructor(metricRepository: IMetricRepository) {
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
    return Athlete.create(createdAthlete.id, createdAthlete.name, createdAthlete.age, createdAthlete.team);
  }

  async findAll(): Promise<Athlete[]> {
    const athletes = await prisma.athlete.findMany();
    return athletes.map(
      (a) => Athlete.create(a.id, a.name, a.age, a.team)
    );
  }

  async findById(id: string): Promise<Athlete | null> {
    const athlete = await prisma.athlete.findUnique({ where: { id } });
    return athlete ? Athlete.create(athlete.id, athlete.name, athlete.age, athlete.team) : null;
  }

  async update(id: string, data: Partial<IAthlete>): Promise<Athlete> {
    const updatedAthlete = await prisma.athlete.update({
      where: { id },
      data,
    });
    return Athlete.create(updatedAthlete.id, updatedAthlete.name, updatedAthlete.age, updatedAthlete.team);
  }

  async delete(id: string): Promise<void> {
    await this.metricRepository.deleteMetricsByAthleteId(id);
    await prisma.athlete.delete({ where: { id } });
  }

  async exists(athleteId: string): Promise<boolean> {
    const athlete = await prisma.athlete.findUnique({ where: { id: athleteId } });
    return athlete !== null;
  }

  static create(): IAthleteRepository {
    if (!AthleteRepository.instance) {
      AthleteRepository.instance = new AthleteRepository(MetricRepository.create());
    }
    return AthleteRepository.instance;
  }
}

