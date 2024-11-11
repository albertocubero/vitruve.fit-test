import React from 'react';
import { render, screen } from '@testing-library/react';
import { AthleteTableActions } from '../../../../src/ui/home/table/AthleteTableActions';

jest.mock('../../../../src/ui/home/buttons/AthleteEditLink', () => {
  return jest.fn(({ athleteId }) => (
    <div data-testid="athlete-edit-link">Edit {athleteId}</div>
  ));
});

jest.mock('../../../../src/ui/home/table/DeleteConfirmationButton', () => {
  return jest.fn(({ athleteId }) => (
    <div data-testid="delete-confirmation-button">Delete {athleteId}</div>
  ));
});

describe('AthleteTableActions', () => {
  const athleteId = '123';

  it('renders AthleteEditLink and DeleteConfirmationButton with the correct athleteId', () => {
    render(<AthleteTableActions athleteId={athleteId} />);

    expect(screen.getByTestId('athlete-edit-link')).toBeInTheDocument();
    expect(screen.getByText(`Edit ${athleteId}`)).toBeInTheDocument();

    expect(
      screen.getByTestId('delete-confirmation-button')
    ).toBeInTheDocument();
    expect(screen.getByText(`Delete ${athleteId}`)).toBeInTheDocument();
  });
});
