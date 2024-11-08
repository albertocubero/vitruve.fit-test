import { DeleteAthleteUseCase, IDeleteAthleteUseCase } from '../../../../../../src/api/v1/application/usecases/athletes/DeleteAthleteUseCase';
import { IAthleteRepository } from '../../../../../../src/api/v1/infrastructure/interfaces/IAthleteRepository';

describe('DeleteAthlete Use Case', () => {
  let deleteAthleteUseCase: IDeleteAthleteUseCase;
  let athleteRepositoryMock: IAthleteRepository;

  beforeEach(() => {
    athleteRepositoryMock = {
      delete: jest.fn(),
    } as unknown as IAthleteRepository;

    deleteAthleteUseCase = new DeleteAthleteUseCase(athleteRepositoryMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should delete athlete', async () => {
    const athleteId = 'athlete-id-123';

    await deleteAthleteUseCase.execute(athleteId);

    expect(athleteRepositoryMock.delete).toHaveBeenCalledWith(athleteId);
    expect(athleteRepositoryMock.delete).toHaveBeenCalledTimes(1);
  });

  it('should use singleton for the DeleteAthleteUseCase instance', () => {
    const instance1 = DeleteAthleteUseCase.create();
    const instance2 = DeleteAthleteUseCase.create();

    expect(instance1).toStrictEqual(instance2);
  });
});
