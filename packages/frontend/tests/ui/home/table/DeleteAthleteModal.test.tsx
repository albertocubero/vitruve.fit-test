import React from 'react';
import { render, screen } from '@testing-library/react';
import DeleteAthleteModal from '../../../../src/ui/home/table/DeleteAthleteModal';
import { useDeleteAthlete } from '../../../../src/ui/hooks/athlete/useDeleteAthlete';
import userEvent from '@testing-library/user-event';

jest.mock('../../../../src/ui/home/table/DeleteIcon', () => () => <div>Trash Icon</div>);
jest.mock('../../../../src/ui/hooks/athlete/useDeleteAthlete', () => ({
  useDeleteAthlete: jest.fn(),
}));

describe('DeleteAthleteModal', () => {
  const closeModalMock = jest.fn();
  const deleteAthleteMock = jest.fn();

  beforeEach(() => {
    (useDeleteAthlete as jest.Mock).mockReturnValue({
      deleteAthlete: deleteAthleteMock,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the modal and calls deleteAthlete on delete button click', async () => {
    render(<DeleteAthleteModal athleteId="123" closeModal={closeModalMock} />);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(/remove user/i)).toBeInTheDocument();
    expect(screen.getByText(/are you sure you want to delete this user/i)).toBeInTheDocument();
    expect(screen.getByText('Trash Icon')).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: /delete/i }));

    expect(deleteAthleteMock).toHaveBeenCalledWith("123");
    expect(closeModalMock).toHaveBeenCalled();
  });

  it('calls closeModal when cancel button is clicked', async () => {
    render(<DeleteAthleteModal athleteId="123" closeModal={closeModalMock} />);

    await userEvent.click(screen.getByRole('button', { name: /cancel/i }));

    expect(closeModalMock).toHaveBeenCalled();
  });
});