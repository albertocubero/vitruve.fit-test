import React from 'react';
import { render, screen } from '@testing-library/react';
import { AthleteCount } from '../../../../src/ui/home/table/AthleteCount';
import { IAthlete } from '../../../../src/domain/types/IAthlete';

describe('AthleteCount', () => {
  it('renders nothing when athletes is undefined', () => {
    render(<AthleteCount athletes={undefined} />);
    expect(screen.queryByText(/Users/i)).toBeNull();
  });

  it('renders nothing when athletes array is empty', () => {
    render(<AthleteCount athletes={[]} />);
    expect(screen.queryByText(/Users/i)).toBeNull();
  });

  it('renders the correct count for one athlete', () => {
    const athletes: IAthlete[] = [{ name: 'John Doe', age: 25, team: 'Team A' }];
    render(<AthleteCount athletes={athletes} />);
    expect(screen.getByText(/1 User/i)).toBeInTheDocument();
  });

  it('renders the correct count for multiple athletes', () => {
    const athletes: IAthlete[] = [
      { name: 'John Doe', age: 25, team: 'Team A' },
      { name: 'Jane Doe', age: 30, team: 'Team B' },
    ];
    render(<AthleteCount athletes={athletes} />);
    expect(screen.getByText(/2 Users/i)).toBeInTheDocument();
  });
});