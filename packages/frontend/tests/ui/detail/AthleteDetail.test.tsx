import React from 'react';
import { render, screen } from '@testing-library/react';
import AthleteDetail from '../../../src/ui/detail/AthleteDetail';
import { useGetAthlete } from '../../../src/ui/hooks/athlete/useGetAthlete';

jest.mock('../../../src/ui/hooks/athlete/useGetAthlete');
jest.mock('../../../src/ui/detail/DetailPageHeader', () => () => <div>Detail Page Header</div>);
jest.mock('../../../src/ui/common/Loading', () => () => <div>Loading...</div>);
jest.mock('../../../src/ui/common/ErrorMessage', () => ({ message }) => <div>{message}</div>);
jest.mock('../../../src/ui/detail/sections/AthleteInfo', () => () => <div>Athlete Info</div>);
jest.mock('../../../src/ui/detail/sections/AthleteMetrics', () => () => <div>Athlete Metrics</div>);

describe('AthleteDetail', () => {
  const athleteId = '123';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state', () => {
    (useGetAthlete as jest.Mock).mockReturnValue({
      isLoading: true,
      data: null,
      error: null,
    });

    render(<AthleteDetail athleteId={athleteId} />);
    
    expect(screen.getByText('Detail Page Header')).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders athlete info and metrics when data is available', () => {
    (useGetAthlete as jest.Mock).mockReturnValue({
      isLoading: false,
      data: { id: athleteId, name: 'John Doe' },
      error: null,
    });

    render(<AthleteDetail athleteId={athleteId} />);
    
    expect(screen.getByText('Detail Page Header')).toBeInTheDocument();
    expect(screen.getByText('Athlete Info')).toBeInTheDocument();
    expect(screen.getByText('Athlete Metrics')).toBeInTheDocument();
  });

  it('renders error message when there is an error', () => {
    (useGetAthlete as jest.Mock).mockReturnValue({
      isLoading: false,
      data: null,
      error: { message: 'Error fetching athlete' },
    });

    render(<AthleteDetail athleteId={athleteId} />);
    
    expect(screen.getByText('Detail Page Header')).toBeInTheDocument();
    expect(screen.getByText('Error fetching athlete')).toBeInTheDocument();
  });
});