import React from 'react';
import { render, screen } from '@testing-library/react';
import MagnifyingGlassIcon from '../../../../src/ui/common/icons/MagnifyingGlassIcon';

describe('MagnifyingGlassIcon', () => {
  it('should render the magnifying glass icon', () => {
    render(<MagnifyingGlassIcon />);

    const icon = screen.getByTestId('magnifying-glass-icon');
    expect(icon).toBeInTheDocument();

    expect(icon).toHaveClass('w-6 h-6');

    const path = screen.getByTestId('magnifying-glass-path');
    expect(path).toHaveAttribute('d', 'M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z');
  });
});
