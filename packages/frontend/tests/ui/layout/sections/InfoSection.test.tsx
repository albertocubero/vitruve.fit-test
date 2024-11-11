import React from 'react';
import { render, screen } from '@testing-library/react';
import InfoSection from '../../../../src/ui/layout/sections/InfoSection';

describe('InfoSection Component', () => {
  const title = 'Test Title';
  const subTitle = 'Test Subtitle';
  const description = 'This is a test description for the InfoSection component.';

  it('renders the title, subtitle, and description', () => {
    render(<InfoSection title={title} subTitle={subTitle} description={description} />);
    
    const titleElement = screen.getByRole('heading', { level: 2 });
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent(title);
    
    const subTitleElement = screen.getByRole('heading', { level: 3 });
    expect(subTitleElement).toBeInTheDocument();
    expect(subTitleElement).toHaveTextContent(subTitle);
    
    const descriptionElement = screen.getByText(description);
    expect(descriptionElement).toBeInTheDocument();
  });

  it('renders with correct styles', () => {
    const { container } = render(<InfoSection title={title} subTitle={subTitle} description={description} />);
    
    const titleElement = container.querySelector('h2');
    expect(titleElement).toHaveClass('text-3xl', 'font-semibold', 'text-gray-100', 'lg:text-4xl');
    
    const subTitleElement = container.querySelector('h3');
    expect(subTitleElement).toHaveClass('mt-4', 'text-2xl', 'font-semibold', 'text-gray-100');
    
    const descriptionElement = container.querySelector('p');
    expect(descriptionElement).toHaveClass('mt-4', 'text-gray-100');
  });
});