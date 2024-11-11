import React from 'react';
import { render, screen } from '@testing-library/react';
import AthleteTableHeaderRow from '../../../../src/ui/home/table/AthleteTableHeaderRow';

describe('AthleteTableHeaderRow', () => {
  it('renders table headers correctly', () => {
    render(<AthleteTableHeaderRow />);

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();
    expect(screen.getByText('Team')).toBeInTheDocument();
  });
});
