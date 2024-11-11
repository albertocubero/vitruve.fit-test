import { DeleteAthleteUseCase } from '../../../../src/application/useCases/athlete/DeleteAthleteUseCase';
import { IAthleteRepository } from '../../../../src/domain/types/IAthleteRepository';

const athleteRepositoryMock: jest.Mocked<IAthleteRepository> = {
    getAllAthletes: jest.fn(),
    getAthleteById: jest.fn(),
    saveAthlete: jest.fn(),
    deleteAthlete: jest.fn(),
};

describe('DeleteAthleteUseCase', () => {
    let deleteAthleteUseCase: DeleteAthleteUseCase;

    beforeEach(() => {
        jest.clearAllMocks();
        deleteAthleteUseCase = new DeleteAthleteUseCase(athleteRepositoryMock);
    });

    it('should delete an athlete successfully', async () => {
        const athleteId = '1';
        athleteRepositoryMock.deleteAthlete.mockResolvedValue(undefined);

        await deleteAthleteUseCase.execute(athleteId);

        expect(athleteRepositoryMock.deleteAthlete).toHaveBeenCalledWith(athleteId);
    });

    it('should throw an error if no athlete ID is provided', async () => {
        await expect(deleteAthleteUseCase.execute(null as any)).rejects.toThrow('Athlete ID must be provided for deletion');
    });

    it('should handle errors when deleting an athlete', async () => {
        const athleteId = '1';
        athleteRepositoryMock.deleteAthlete.mockRejectedValue(new Error('Database error'));

        await expect(deleteAthleteUseCase.execute(athleteId)).rejects.toThrow('Database error');
    });
});