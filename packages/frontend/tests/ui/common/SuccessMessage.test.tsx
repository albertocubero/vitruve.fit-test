import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import SuccessMessage from '../../../src/ui/common/SuccessMessage';

describe('SuccessMessage', () => {
  it('should render the success message and disappear after 6 seconds', async () => {
    const message = 'Operation successful';
    render(<SuccessMessage message={message} />);

    const successCard = screen.getByTestId('success-message');
    expect(successCard).toBeInTheDocument();
    expect(screen.getByText(message)).toBeInTheDocument();
    await waitFor(() => expect(successCard).toHaveStyle('opacity: 1'), {
      timeout: 1000,
    });
    await waitFor(() => expect(successCard).toHaveStyle('opacity: 0'), {
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
