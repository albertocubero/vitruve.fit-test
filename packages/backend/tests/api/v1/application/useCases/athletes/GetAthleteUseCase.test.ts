import {
  GetAthleteUseCase,
  IGetAthleteUseCase,
} from '../../../../../../src/api/v1/application/usecases/athletes/GetAthleteUseCase';
import { IAthlete } from '../../../../../../src/api/v1/domain/entities/Athlete';
import { IAthleteRepository } from '../../../../../../src/api/v1/infrastructure/interfaces/IAthleteRepository';

describe('GetAthleteUseCase', () => {
  let getAthleteUseCase: IGetAthleteUseCase;
  let athleteRepositoryMock: IAthleteRepository;

  const athleteId = 'athlete-id-1';
  const athlete: IAthlete = { id: '1', name: 'John Doe',age: 25, team: 'Team A', };

  beforeEach(() => {
    athleteRepositoryMock = {
      findById: jest
        .fn()
        .mockImplementation((id: string) =>
          id === athleteId ? Promise.resolve(athlete) : Promise.resolve(null)
        ),
    } as unknown as IAthleteRepository;

    getAthleteUseCase = new GetAthleteUseCase(athleteRepositoryMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return an athlete when is called with an valid ID', async () => {
    const result = await getAthleteUseCase.execute(athleteId);

    expect(result).toEqual(athlete);
  });

  it('should return null when is called with an invalid ID', async () => {
    const athleteIdNotExist = 'athlete-id-not-exist';

    const result = await getAthleteUseCase.execute(athleteIdNotExist);

    expect(result).toBeNull();
  });

  it('should use singleton for the GetAthleteUseCase instance', () => {
    const instance1 = GetAthleteUseCase.create();
    const instance2 = GetAthleteUseCase.create();

    expect(instance1).toBe(instance2);
  });
});
