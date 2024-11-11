import React from 'react';
import { render, screen } from '@testing-library/react';
import { EditAthlete } from '../../../src/ui/edit/EditAthlete';
import { useGetAthlete } from '../../../src/ui/hooks/athlete/useGetAthlete';
import { useUpdateAthlete } from '../../../src/ui/hooks/athlete/useUpdateAthlete';

jest.mock('../../../src/ui/hooks/athlete/useGetAthlete');
jest.mock('../../../src/ui/hooks/athlete/useUpdateAthlete');
jest.mock('../../../src/ui/common/Loading', () => () => <div>Loading...</div>);
jest.mock('../../../src/ui/common/ErrorMessage', () => ({ message }) => <div>{message}</div>);
jest.mock('../../../src/ui/common/SuccessMessage', () => ({ message }) => <div>{message}</div>);
jest.mock('../../../src/ui/edit/sections/MetricsSection', () => () => <div>Metrics Section</div>);
jest.mock('../../../src/ui/edit/EditPageHeader', () => () => <h1>Edit Athlete</h1>);
jest.mock('../../../src/ui/form/AthleteForm', () => ({ athlete, onSubmit }) => (
  <div>
    <div>Form for {athlete.name}</div>
    <button type="button" onClick={() => onSubmit(athlete)}>Update Athlete</button>
  </div>
));

describe('EditAthlete', () => {
  const athleteId = '123';
  const mockAthlete = { id: athleteId, name: 'John Doe' };
  let editAthleteMock;

    beforeEach(() => {
        editAthleteMock = jest.fn();
    })

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('displays loading indicator while loading athlete', () => {
    (useGetAthlete as jest.Mock).mockReturnValue({
      data: null,
      error: null,
      isLoading: true,
    });

    (useUpdateAthlete as jest.Mock).mockReturnValue({
      editAthlete: editAthleteMock,
      isSuccess: true,
      isError: false,
    });

    render(<EditAthlete athleteId={athleteId} />);
    
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it('displays error message when there is an error fetching athlete', async () => {
    const errorMessage = 'Failed to fetch athlete';
    (useGetAthlete as jest.Mock).mockReturnValue({
      data: null,
      error: { message: errorMessage },
      isLoading: false,
    });

    (useUpdateAthlete as jest.Mock).mockReturnValue({
      editAthlete: editAthleteMock,
      isSuccess: true,
      isError: false,
    });

    render(<EditAthlete athleteId={athleteId} />);
    
    expect(await screen.findByText(errorMessage)).toBeInTheDocument();
  });

  it('displays athlete form when athlete data is fetched', async () => {
    (useGetAthlete as jest.Mock).mockReturnValue({
      data: mockAthlete,
      error: null,
      isLoading: false,
    });

    (useUpdateAthlete as jest.Mock).mockReturnValue({
      editAthlete: editAthleteMock,
      isSuccess: true,
      isError: false,
    });

    render(<EditAthlete athleteId={athleteId} />);

    expect(await screen.findByText(/Form for John Doe/i)).toBeInTheDocument();
  });

  it('displays success message after athlete is updated', async () => {
    (useGetAthlete as jest.Mock).mockReturnValue({
      data: mockAthlete,
      error: null,
      isLoading: false,
    });

    (useUpdateAthlete as jest.Mock).mockReturnValue({
      editAthlete: editAthleteMock,
      isSuccess: true,
      isError: false,
    });

    render(<EditAthlete athleteId={athleteId} />);

    await screen.findByText(/Form for John Doe/i);
    screen.getByText('Update Athlete').click();

    expect(editAthleteMock).toHaveBeenCalledWith(mockAthlete);
    expect(await screen.findByText(/The user was updated!/i)).toBeInTheDocument();
  });

  it('displays error message when athlete update fails', async () => {
    (useGetAthlete as jest.Mock).mockReturnValue({
      data: mockAthlete,
      error: null,
      isLoading: false,
    });

    (useUpdateAthlete as jest.Mock).mockReturnValue({
      editAthlete: editAthleteMock,
      isSuccess: false,
      isError: true,
    });

    render(<EditAthlete athleteId={athleteId} />);

    await screen.findByText(/Form for John Doe/i);
    screen.getByText('Update Athlete').click();

    expect(await screen.findByText(/Failed to update athlete. Please check the input data and try again./i)).toBeInTheDocument();
  });

  it('renders MetricsSection when athlete data is available', async () => {
    (useGetAthlete as jest.Mock).mockReturnValue({
      data: mockAthlete,
      error: null,
      isLoading: false,
    });

    (useUpdateAthlete as jest.Mock).mockReturnValue({
      editAthlete: editAthleteMock,
      isSuccess: true,
      isError: false,
    });

    render(<EditAthlete athleteId={athleteId} />);

    expect(await screen.findByText(/Metrics Section/i)).toBeInTheDocument();
  });
});