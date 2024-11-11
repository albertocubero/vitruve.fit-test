import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ErrorMessage from '../../../src/ui/common/ErrorMessage';

describe('ErrorMessage', () => {
  it('should render the error message and disappear after 6 seconds', async () => {
    const message = 'An error occurred';
    render(<ErrorMessage message={message} />);

    const errorCard = screen.getByTestId('error-message');
    expect(errorCard).toBeInTheDocument();
    expect(screen.getByText(message)).toBeInTheDocument();
    await waitFor(() => expect(errorCard).toHaveStyle('opacity: 1'), {
      timeout: 1000,
    });
    await waitFor(() => expect(errorCard).toHaveStyle('opacity: 0'), {
      timeout: 5000,
    });
    await waitFor(
      () => {
        expect(screen.queryByText(message)).not.toBeInTheDocument();
      },
      { timeout: 6000 }
    );
  }, 20000);
});
