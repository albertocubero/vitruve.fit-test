import { GetAllAthletesUseCase, IGetAllAthletesUseCase } from '../../../../../../src/api/v1/application/usecases/athletes/GetAllAthletesUseCase';
import { IAthlete } from '../../../../../../src/api/v1/domain/entities/Athlete';
import { IAthleteRepository } from '../../../../../../src/api/v1/infrastructure/interfaces/IAthleteRepository';

describe('GetAllAthletes Use Case', () => {
  let getAllAthletesUseCase: IGetAllAthletesUseCase;
  let athleteRepositoryMock: IAthleteRepository;

  const athletes: IAthlete[] = [
    { id: '1', name: 'John Doe', age: 25, team: 'Team A' },
    { id: '2', name: 'Jane Smith', age: 28, team: 'Team B' },
  ];

  beforeEach(() => {
    athleteRepositoryMock = {
      findAll: jest.fn(),
    } as unknown as IAthleteRepository;

    getAllAthletesUseCase = new GetAllAthletesUseCase(athleteRepositoryMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return a list of athletes', async () => {
    athleteRepositoryMock.findAll = jest.fn().mockResolvedValue(athletes);

    const result = await getAllAthletesUseCase.execute();

    expect(result).toEqual(athletes);
    expect(athleteRepositoryMock.findAll).toHaveBeenCalledTimes(1);
  });

  it('should use singleton for the GetAllAthletesUseCase instance', () => {
    const instance1 = GetAllAthletesUseCase.create();
    const instance2 = GetAllAthletesUseCase.create();

    expect(instance1).toBe(instance2);
  });
});
