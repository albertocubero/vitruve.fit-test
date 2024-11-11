import { UpdateAthleteUseCase } from '../../../../src/application/useCases/athlete/UpdateAthleteUseCase';
import { IAthleteRepository } from '../../../../src/domain/types/IAthleteRepository';
import { IAthlete } from '../../../../src/domain/types/IAthlete';

const athleteRepositoryMock: jest.Mocked<IAthleteRepository> = {
    getAllAthletes: jest.fn(),
    getAthleteById: jest.fn(),
    saveAthlete: jest.fn(),
    deleteAthlete: jest.fn(),
};

describe('UpdateAthleteUseCase', () => {
    let updateAthleteUseCase: UpdateAthleteUseCase;

    beforeEach(() => {
        jest.clearAllMocks();
        updateAthleteUseCase = new UpdateAthleteUseCase(athleteRepositoryMock);
    });

    it('should update an athlete successfully', async () => {
        const athlete: IAthlete = { id: '1', name: 'John Doe', age: 25, team: 'Team A' };
        athleteRepositoryMock.saveAthlete.mockResolvedValue(athlete);

        const result = await updateAthleteUseCase.execute(athlete);

        expect(result).toEqual(athlete);
        expect(athleteRepositoryMock.saveAthlete).toHaveBeenCalledWith(athlete);
    });

    it('should throw an error if athlete ID is not provided', async () => {
        const athlete: IAthlete = { id: '', name: 'John Doe', age: 25, team: 'Team A' };

        await expect(updateAthleteUseCase.execute(athlete)).rejects.toThrow('Athlete must have an ID to be updated');
    });

    it('should handle errors when saving an athlete', async () => {
        const athlete: IAthlete = { id: '1', name: 'John Doe', age: 25, team: 'Team A' };
        athleteRepositoryMock.saveAthlete.mockRejectedValue(new Error('Database error'));

        await expect(updateAthleteUseCase.execute(athlete)).rejects.toThrow('Database error');
    });
});