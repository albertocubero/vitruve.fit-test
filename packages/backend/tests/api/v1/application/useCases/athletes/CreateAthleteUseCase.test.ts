import { CreateAthleteUseCase, ICreateAthleteUseCase } from '../../../../../../src/api/v1/application/usecases/athletes/CreateAthleteUseCase';
import { IAthleteRepository } from '../../../../../../src/api/v1/infrastructure/interfaces/IAthleteRepository';
import { IAthlete } from '../../../../../../src/api/v1/domain/entities/Athlete';

describe('CreateAthlete Use Case', () => {
  let createAthleteUseCase: ICreateAthleteUseCase;
  let athleteRepositoryMock: IAthleteRepository;

  const newAthlete: IAthlete = { name: 'John Doe', age: 25, team: 'Team A', };
  const athleteCreated: IAthlete = { id: 'athlete-id-123', name: 'John Doe', age: 25, team: 'Team A', };

  beforeEach(() => {
    athleteRepositoryMock = {
      create: jest.fn(),
    } as unknown as IAthleteRepository;

    createAthleteUseCase = new CreateAthleteUseCase(athleteRepositoryMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create an athlete', async () => {
    athleteRepositoryMock.create = jest.fn().mockResolvedValue(athleteCreated);

    const result = await createAthleteUseCase.execute(newAthlete);

    expect(result).toEqual(athleteCreated);
  });

  it('should use singleton for the CreateAthleteUseCase instance', () => {
    const instance1 = CreateAthleteUseCase.create();
    const instance2 = CreateAthleteUseCase.create();

    expect(instance1).toStrictEqual(instance2);
  });
});
