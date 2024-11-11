import React from 'react';
import { render, screen } from '@testing-library/react';
import AthleteInfo from '../../../../src/ui/detail/sections/AthleteInfo';
import { IAthlete } from '../../../../src/domain/types/IAthlete';

describe('AthleteInfo', () => {
  const mockAthlete: IAthlete = {
    name: 'John Doe',
    age: 25,
    team: 'Team A',
  };

  it('renders athlete information correctly', () => {
    render(<AthleteInfo athlete={mockAthlete} />);

    expect(screen.getByText('Name:')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Age:')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
    expect(screen.getByText('Team:')).toBeInTheDocument();
    expect(screen.getByText('Team A')).toBeInTheDocument();
  });
});