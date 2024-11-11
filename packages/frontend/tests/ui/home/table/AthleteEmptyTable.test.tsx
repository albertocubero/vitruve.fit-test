import React from 'react';
import { render, screen } from '@testing-library/react';
import AthleteEmptyTable from '../../../../src/ui/home/table/AthleteEmptyTable';

jest.mock('../../../../src/ui/home/table/CreateAthleteButton', () => {
  return function MockCreateAthleteButton() {
    return <button>Create Athlete</button>;
  };
});

jest.mock('../../../../src/ui/common/icons/MagnifyingGlassIcon', () => {
  return function MockMagnifyingGlassIcon() {
    return <div data-testid="magnifying-glass-icon">🔍</div>;
  };
});

describe('AthleteEmptyTable', () => {
  it('renders the empty state correctly', () => {
    render(<AthleteEmptyTable />);

    expect(screen.getByText(/No users found/i)).toBeInTheDocument();
    expect(screen.getByText(/Please try again or create add a new user/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Create Athlete/i })).toBeInTheDocument();
  });

  it('renders the magnifying glass icon', () => {
    render(<AthleteEmptyTable />);

    const icon = screen.getByTestId('magnifying-glass-icon');
    expect(icon).toBeInTheDocument();
  });
});