import React from 'react';
import { render, screen } from '@testing-library/react';
import { Logo } from '../../../../src/ui/layout/sections/Logo';

jest.mock('../../../../src/assets/images/logo.png', () => 'mocked-logo.png');

describe('Logo Component', () => {
  it('renders the logo image with correct src and alt attributes', () => {
    render(<Logo />);
    
    const logoElement = screen.getByRole('img', { name: /logo/i });
    
    expect(logoElement).toBeInTheDocument();
    expect(logoElement).toHaveAttribute('src', 'mocked-logo.png');
    expect(logoElement).toHaveAttribute('alt', 'Logo');
  });

  it('has the correct classes', () => {
    const { container } = render(<Logo />);
    
    const logoElement = container.querySelector('img');
    expect(logoElement).toHaveClass('h-auto', 'max-h-9', 'w-auto');
  });
});