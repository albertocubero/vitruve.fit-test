import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { VitruveFitButton, LinkedInHighLightButton, GitHubHighLightButton } from '../../../../src/ui/layout/sections/Buttons';

describe('Button Components', () => {
  it('should render VitruveFitButton with correct link and title', () => {
    render(
      <MemoryRouter>
        <VitruveFitButton />
      </MemoryRouter>
    );
    
    const linkElement = screen.getByRole('link', { name: /Vitruve/i });
    
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', 'https://vitruve.fit/');
    expect(linkElement).toHaveAttribute('target', '_blank');
    expect(linkElement).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('should render LinkedInHighLightButton with correct link and title', () => {
    render(
      <MemoryRouter>
        <LinkedInHighLightButton />
      </MemoryRouter>
    );
    
    const linkElement = screen.getByRole('link', { name: /LinkedIn/i });
    
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', 'https://www.linkedin.com/in/alberto-cubero-navas/');
    expect(linkElement).toHaveAttribute('target', '_blank');
    expect(linkElement).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('should render GitHubHighLightButton with correct link and title', () => {
    render(
      <MemoryRouter>
        <GitHubHighLightButton />
      </MemoryRouter>
    );
    
    const linkElement = screen.getByRole('link', { name: /GitHub/i });
    
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', 'https://github.com/albertocubero');
    expect(linkElement).toHaveAttribute('target', '_blank');
    expect(linkElement).toHaveAttribute('rel', 'noopener noreferrer');
  });
});