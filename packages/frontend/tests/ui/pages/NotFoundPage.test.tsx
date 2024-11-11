import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import NotFoundPage from '../../../src/ui/pages/NotFoundPage';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: jest.fn(),
}));

describe('NotFoundPage Component', () => {
  it('renders the NotFoundPage with correct content', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/404 error/i)).toBeInTheDocument();
    expect(screen.getByText(/Page not found/i)).toBeInTheDocument();
    expect(screen.getByText(/Sorry, the page you are looking for doesn't exist/i)).toBeInTheDocument();
  });

  it('navigates to home when the button is clicked', async () => {
    const historyPushMock = jest.fn();
    const useHistoryMock = require('react-router-dom').useHistory;
    useHistoryMock.mockReturnValue({ push: historyPushMock });
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    await userEvent.click(screen.getByRole('button', { name: /Take me home/i }));

    expect(historyPushMock).toHaveBeenCalledWith('/');
  });
});