import { GetAthleteUseCase } from '../../../../src/application/useCases/athlete/GetAthleteUseCase';
import { IAthleteRepository } from '../../../../src/domain/types/IAthleteRepository';
import { IAthlete } from '../../../../src/domain/types/IAthlete';

const athleteRepositoryMock: jest.Mocked<IAthleteRepository> = {
    getAllAthletes: jest.fn(),
    getAthleteById: jest.fn(),
    saveAthlete: jest.fn(),
    deleteAthlete: jest.fn(),
};

describe('GetAthleteUseCase', () => {
    let getAthleteUseCase: GetAthleteUseCase;

    beforeEach(() => {
        jest.clearAllMocks();
        getAthleteUseCase = new GetAthleteUseCase(athleteRepositoryMock);
    });

    it('should return an athlete successfully', async () => {
        const athleteId = '1';
        const athlete: IAthlete = { id: athleteId, name: 'John Doe', age: 25, team: 'Team A' };
        athleteRepositoryMock.getAthleteById.mockResolvedValue(athlete);

        const result = await getAthleteUseCase.execute(athleteId);

        expect(result).toEqual(athlete);
        expect(athleteRepositoryMock.getAthleteById).toHaveBeenCalledWith(athleteId);
    });

    it('should throw an error if no athlete ID is provided', async () => {
        await expect(getAthleteUseCase.execute(null as any)).rejects.toThrow('Athlete ID must be provided');
    });

    it('should handle errors when getting an athlete', async () => {
        const athleteId = '1';
        athleteRepositoryMock.getAthleteById.mockRejectedValue(new Error('Database error'));

        await expect(getAthleteUseCase.execute(athleteId)).rejects.toThrow('Database error');
    });
});