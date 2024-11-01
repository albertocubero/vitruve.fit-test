import { PrismaClient, Athlete as PrismaAthlete } from '@prisma/client';
import { Athlete, IAthlete } from '../../domain/entities/Athlete';
import { IAthleteRepository } from '../interfaces/IAthleteRepository';
import { IMetricRepository } from '../interfaces/IMetricRepository';
import { MetricRepository } from './MetricRepository';
import { prismaBaseServiceFactory } from './PrismaDbConnector';

export class AthleteRepository implements IAthleteRepository {
  private static instance: IAthleteRepository;
  private metricRepository: IMetricRepository;
  private prismaInstance: PrismaClient;

  private constructor(metricRepository: IMetricRepository) {
    this.metricRepository = metricRepository;
    this.prismaInstance = prismaBaseServiceFactory.getInstance();
  }

  async create(athlete: Athlete): Promise<Athlete> {
    try {
      const createdAthlete: PrismaAthlete = await this.prismaInstance.athlete.create({
        data: {
          name: athlete.name,
          age: athlete.age,
          team: athlete.team,
        },
      });
      return Athlete.create({id: createdAthlete.id, name: createdAthlete.name, age: createdAthlete.age, team: createdAthlete.team});
    } catch (error) {
      throw new Error(`[ATHLETES] Failed to create athlete: ${error}`);
    }
  }

  async findAll(): Promise<Athlete[]> {
    try {
      const athletes: PrismaAthlete[] = await this.prismaInstance.athlete.findMany();
      return athletes.map(
        (a: PrismaAthlete) => Athlete.create({id: a.id, name: a.name, age: a.age, team: a.team})
      );
    } catch (error) {
      throw new Error(`[ATHLETES] Failed to retrieve athletes: ${error}`);
    }
  }

  async findById(id: string): Promise<Athlete | null> {
    try {
      const athlete: PrismaAthlete | null = await this.prismaInstance.athlete.findUnique({ where: { id } });
      return athlete ? Athlete.create({id: athlete.id, name: athlete.name, age: athlete.age, team: athlete.team}) : null;
    } catch (error) {
      throw new Error(`[ATHLETES] Failed to retrieve athlete by ID: ${error}`);
    }
  }

  async update(id: string, data: Partial<IAthlete>): Promise<Athlete> {
    try {
      const updatedAthlete: PrismaAthlete = await this.prismaInstance.athlete.update({
        where: { id },
        data,
      });
      return Athlete.create({id: updatedAthlete.id, name: updatedAthlete.name, age: updatedAthlete.age, team: updatedAthlete.team});
    } catch (error) {
      throw new Error(`[ATHLETES] Failed to update athlete with ID ${id}: ${error}`);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.metricRepository.deleteMetricsByAthleteId(id);
      await this.prismaInstance.athlete.delete({ where: { id } });
    } catch (error) {
      throw new Error(`[ATHLETES] Failed to delete athlete with ID ${id}: ${error}`);
    }
  }

  async exists(athleteId: string): Promise<boolean> {
    try {
      const athlete: PrismaAthlete | null = await this.prismaInstance.athlete.findUnique({ where: { id: athleteId } });
      return athlete !== null;
    } catch (error) {
      throw new Error(`[ATHLETES] Failed to check existence of athlete with ID ${athleteId}: ${error}`);
    }
  }

  static create(): IAthleteRepository {
    if (!AthleteRepository.instance) {
      AthleteRepository.instance = new AthleteRepository(MetricRepository.create());
    }
    return AthleteRepository.instance;
  }
}

