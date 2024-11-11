import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DeleteConfirmationButton from '../../../../src/ui/home/table/DeleteConfirmationButton';

jest.mock('../../../../src/ui/home/table/DeleteIcon', () => () => <div>Trash Icon</div>);
jest.mock('../../../../src/ui/hooks/athlete/useDeleteAthlete', () => ({
  useDeleteAthlete: jest.fn(),
}));
jest.mock('../../../../src/ui/home/table/DeleteAthleteModal', () => {
  return jest.fn(({ closeModal }) => (
    <div>
      <h1>Mocked Delete Athlete Modal</h1>
      <button onClick={closeModal}>Close Modal</button>
    </div>
  ));
});

describe('DeleteConfirmationButton', () => {
  const athleteId = '123';

  it('opens the modal when the button is clicked', async () => {
    render(<DeleteConfirmationButton athleteId={athleteId} />);
    expect(screen.queryByText(/mocked delete athlete modal/i)).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: /trash icon/i }));

    expect(screen.getByText(/mocked delete athlete modal/i)).toBeInTheDocument();
  });

  it('closes the modal when the close button is clicked', async () => {
    render(<DeleteConfirmationButton athleteId={athleteId} />);
    await userEvent.click(screen.getByRole('button', { name: /trash icon/i }));
    expect(screen.getByText(/mocked delete athlete modal/i)).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: /close modal/i }));

    expect(screen.queryByText(/mocked delete athlete modal/i)).not.toBeInTheDocument();
  });
});