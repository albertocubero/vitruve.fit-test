import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePageHeader from '../../../src/ui/home/HomePageHeader';
import { IAthlete } from '../../../src/domain/types/IAthlete';

jest.mock('../../../src/ui/home/table/AthleteCount', () => ({
    AthleteCount: ({ athletes }) => <div data-testid="athlete-count">Athletes Count: {athletes?.length ?? 0}</div>
}));

jest.mock('../../../src/ui/home/table/CreateAthleteButton', () => {
  return jest.fn(() => <button data-testid="create-athlete-button">Create Athlete</button>);
});

describe('HomePageHeader', () => {
  it('renders the header with athletes count and create button', () => {
    const athletes: IAthlete[] = [
      { id: '1', name: 'Athlete 1', age: 25, team: 'Team A' },
      { id: '2', name: 'Athlete 2', age: 30, team: 'Team B' }
    ];

    render(<HomePageHeader athletes={athletes} />);

    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByTestId('athlete-count')).toHaveTextContent('Athletes Count: 2');
    expect(screen.getByTestId('create-athlete-button')).toBeInTheDocument();
  });

  it('renders the header with zero athletes', () => {
    render(<HomePageHeader athletes={[]} />);
    
    expect(screen.getByTestId('athlete-count')).toHaveTextContent('Athletes Count: 0');
  });

  it('renders the header without athletes', () => {
    render(<HomePageHeader athletes={undefined} />);
    
    expect(screen.getByTestId('athlete-count')).toHaveTextContent('Athletes Count: 0');
  });
});