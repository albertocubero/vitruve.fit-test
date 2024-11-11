import React from 'react';
import { render, screen } from '@testing-library/react';
import PageHeader from '../../../../src/ui/common/page/PageHeader';

jest.mock('../../../../src/ui/common/BackButton', () => {
  return jest.fn(() => <div data-testid="back-button" />);
});

describe('PageHeader', () => {
  it('should render the title and BackButton', () => {
    const title = 'Athlete Profile';

    render(<PageHeader title={title} />);

    const titleElement = screen.getByText(title);
    expect(titleElement).toBeInTheDocument();

    const backButton = screen.getByTestId('back-button');
    expect(backButton).toBeInTheDocument();
  });
});
