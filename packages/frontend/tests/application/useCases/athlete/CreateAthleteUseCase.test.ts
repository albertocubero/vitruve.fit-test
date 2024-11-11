import { CreateAthleteUseCase } from '../../../../src/application/useCases/athlete/CreateAthleteUseCase';
import { IAthleteRepository } from '../../../../src/domain/types/IAthleteRepository';
import { IAthlete } from '../../../../src/domain/types/IAthlete';

const athleteRepositoryMock: jest.Mocked<IAthleteRepository> = {
    getAllAthletes: jest.fn(),
    getAthleteById: jest.fn(),
    saveAthlete: jest.fn(),
    deleteAthlete: jest.fn(),
};

describe('CreateAthleteUseCase', () => {
    let createAthleteUseCase: CreateAthleteUseCase;

    beforeEach(() => {
        jest.clearAllMocks();
        createAthleteUseCase = new CreateAthleteUseCase(athleteRepositoryMock);
    });

    it('should create an athlete successfully', async () => {
        const newAthlete: IAthlete = { id: '1', name: 'John Doe', age: 25, team: 'Team A' };
        athleteRepositoryMock.saveAthlete.mockResolvedValue(newAthlete);

        const result = await createAthleteUseCase.execute(newAthlete);

        expect(result).toEqual(newAthlete);
        expect(athleteRepositoryMock.saveAthlete).toHaveBeenCalledWith(newAthlete);
    });

    it('should throw an error if no athlete is provided', async () => {
        await expect(createAthleteUseCase.execute(null as any)).rejects.toThrow('Athlete must be provided for creation');
    });

    it('should throw an error if saving the athlete fails', async () => {
        const newAthlete: IAthlete = { id: '1', name: 'John Doe', age: 25, team: 'Team A' };
        athleteRepositoryMock.saveAthlete.mockRejectedValue(new Error('Database error'));

        await expect(createAthleteUseCase.execute(newAthlete)).rejects.toThrow('Database error');
    });
});