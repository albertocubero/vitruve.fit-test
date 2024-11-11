import { AthleteRepository } from '../../../src/infrastructure/repositories/AthleteRepository';
import { IAthlete } from '../../../src/domain/types/IAthlete';
import { IAthleteService } from '../../../src/infrastructure/services/athleteService';

const athleteServiceMock: jest.Mocked<IAthleteService> = {
  getAthletes: jest.fn(),
  getAthlete: jest.fn(),
  saveAthlete: jest.fn(),
  deleteAthlete: jest.fn(),
  getMetrics: jest.fn(),
  addMetric: jest.fn(),
};

describe('AthleteRepository', () => {
  let athleteRepository: AthleteRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    athleteRepository = new AthleteRepository(athleteServiceMock);
  });

  it('should retrieve all athletes', async () => {
    const mockAthletes: IAthlete[] = [
      { id: '1', name: 'John Doe', age: 25, team: 'Team A' },
      { id: '2', name: 'Jane Doe', age: 30, team: 'Team B' }
    ];
    athleteServiceMock.getAthletes.mockResolvedValue(mockAthletes);

    const athletes = await athleteRepository.getAllAthletes();

    expect(athletes).toEqual(mockAthletes);
    expect(athleteServiceMock.getAthletes).toHaveBeenCalled();
  });

  it('should retrieve an athlete by id', async () => {
    const mockAthlete: IAthlete = { id: '1', name: 'John Doe', age: 25, team: 'Team A' };
    athleteServiceMock.getAthlete.mockResolvedValue(mockAthlete);

    const athlete = await athleteRepository.getAthleteById('1');

    expect(athlete).toEqual(mockAthlete);
    expect(athleteServiceMock.getAthlete).toHaveBeenCalledWith('1');
  });

  it('should save an athlete', async () => {
    const newAthlete: IAthlete = { id: '2', name: 'Jane Doe', age: 30, team: 'Team B' };
    athleteServiceMock.saveAthlete.mockResolvedValue(newAthlete);

    const savedAthlete = await athleteRepository.saveAthlete(newAthlete);

    expect(savedAthlete).toEqual(newAthlete);
    expect(athleteServiceMock.saveAthlete).toHaveBeenCalledWith(newAthlete);
  });

  it('should delete an athlete', async () => {
    const athleteId = '1';
    athleteServiceMock.deleteAthlete.mockResolvedValue(undefined);

    await athleteRepository.deleteAthlete(athleteId);

    expect(athleteServiceMock.deleteAthlete).toHaveBeenCalledWith(athleteId);
  });
});