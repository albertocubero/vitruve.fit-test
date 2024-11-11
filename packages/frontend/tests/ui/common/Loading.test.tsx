import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Loading from '../../../src/ui/common/Loading';

describe('Loading', () => {
  it('should show the loading spinner after 500ms', async () => {
    render(<Loading />);

    expect(screen.queryByTestId('loading-spinner')).toBeNull();
    await waitFor(
      () => expect(screen.getByTestId('loading-spinner')).toBeInTheDocument(),
      { timeout: 600 }
    );

    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toBeInTheDocument();
  });
});
