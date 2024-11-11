import { GetAthletesUseCase } from '../../../../src/application/useCases/athlete/GetAthletesUseCase';
import { IAthleteRepository } from '../../../../src/domain/types/IAthleteRepository';
import { IAthlete } from '../../../../src/domain/types/IAthlete';

const athleteRepositoryMock: jest.Mocked<IAthleteRepository> = {
    getAllAthletes: jest.fn(),
    getAthleteById: jest.fn(),
    saveAthlete: jest.fn(),
    deleteAthlete: jest.fn(),
};

describe('GetAthletesUseCase', () => {
    let getAthletesUseCase: GetAthletesUseCase;

    beforeEach(() => {
        jest.clearAllMocks();
        getAthletesUseCase = new GetAthletesUseCase(athleteRepositoryMock);
    });

    it('should return a list of athletes successfully', async () => {
        const athletes: IAthlete[] = [
            { id: '1', name: 'John Doe', age: 25, team: 'Team A' },
            { id: '2', name: 'Jane Smith', age: 30, team: 'Team B' },
        ];
        athleteRepositoryMock.getAllAthletes.mockResolvedValue(athletes);

        const result = await getAthletesUseCase.execute();

        expect(result).toEqual(athletes);
        expect(athleteRepositoryMock.getAllAthletes).toHaveBeenCalledTimes(1);
    });

    it('should handle errors when getting athletes', async () => {
        athleteRepositoryMock.getAllAthletes.mockRejectedValue(new Error('Database error'));

        await expect(getAthletesUseCase.execute()).rejects.toThrow('Database error');
    });
});