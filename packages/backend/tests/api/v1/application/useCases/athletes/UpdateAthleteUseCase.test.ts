import {
  UpdateAthleteUseCase,
  IUpdateAthleteUseCase,
} from '../../../../../../src/api/v1/application/usecases/athletes/UpdateAthleteUseCase';
import { IAthlete } from '../../../../../../src/api/v1/domain/entities/Athlete';
import { IAthleteRepository } from '../../../../../../src/api/v1/infrastructure/interfaces/IAthleteRepository';

describe('UpdateAthleteUseCase', () => {
  let updateAthleteUseCase: IUpdateAthleteUseCase;
  let athleteRepositoryMock: IAthleteRepository;

  const athlete: IAthlete = {id: '1', name: 'John Doe', age: 25, team: 'Team A',};
  const updatedData: Partial<IAthlete> = { age: 26, team: 'Team B' };

  beforeEach(() => {
    athleteRepositoryMock = {
      update: jest.fn(),
    } as unknown as IAthleteRepository;

    updateAthleteUseCase = new UpdateAthleteUseCase(athleteRepositoryMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should update athlete', async () => {
    const athleteId = 'athlete-id-1';
    const updatedAthlete = { ...athlete, ...updatedData };
    athleteRepositoryMock.update = jest.fn().mockResolvedValueOnce(updatedAthlete);

    const result = await updateAthleteUseCase.execute(athleteId, updatedData);

    expect(result).toEqual(updatedAthlete);
  });

  it('should use singleton for the UpdateAthleteUseCase instance', () => {
    const instance1 = UpdateAthleteUseCase.create();
    const instance2 = UpdateAthleteUseCase.create();

    expect(instance1).toStrictEqual(instance2);
  });
});
