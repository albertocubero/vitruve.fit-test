import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AthleteForm from '../../../src/ui/form/AthleteForm';
import { IAthlete } from '../../../src/domain/types/IAthlete';

describe('AthleteForm', () => {
  let mockOnSubmit;
  const athlete: IAthlete = { name: 'John Doe', age: 25, team: 'Team A' };

  beforeEach(() => {
    mockOnSubmit = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders form fields', () => {
    render(<AthleteForm onSubmit={mockOnSubmit} />);

    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Age/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Team/i)).toBeInTheDocument();
  });

  it('calls onSubmit with form data when valid', async () => {
    render(<AthleteForm onSubmit={mockOnSubmit} />);

    await userEvent.type(screen.getByLabelText(/Name/i), 'John Doe');
    await userEvent.type(screen.getByLabelText(/Age/i), '25');
    await userEvent.type(screen.getByLabelText(/Team/i), 'Team A');

    await userEvent.click(screen.getByText(/Save Athlete/i));

    expect(mockOnSubmit).toHaveBeenCalledWith({
      name: 'John Doe',
      age: 25,
      team: 'Team A',
    });
  });

  it('resets form with athlete data when athlete prop is provided', async () => {
    render(<AthleteForm athlete={athlete} onSubmit={mockOnSubmit} />);

    await waitFor(() => {
      expect(screen.getByLabelText(/Name/i)).toHaveValue('John Doe');
      expect(screen.getByLabelText(/Age/i)).toHaveValue(25);
      expect(screen.getByLabelText(/Team/i)).toHaveValue('Team A');
    });
  });

  it('resets form after submission if resetOnPerform is true', async () => {
    render(<AthleteForm onSubmit={mockOnSubmit} resetOnPerform={true} />);

    await userEvent.type(screen.getByLabelText(/Name/i), 'John Doe');
    await userEvent.type(screen.getByLabelText(/Age/i), '25');
    await userEvent.type(screen.getByLabelText(/Team/i), 'Team A');
    await userEvent.click(screen.getByText(/Save Athlete/i));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalled();
      expect(screen.getByLabelText(/Name/i)).toHaveValue('');
      expect(screen.getByLabelText(/Age/i)).toHaveValue(0);
      expect(screen.getByLabelText(/Team/i)).toHaveValue('');
    });
  });
});
