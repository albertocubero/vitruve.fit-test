import React from 'react';
import { render, screen } from '@testing-library/react';
import { HomePage } from '../../../src/ui/pages/HomePage';

jest.mock('../../../src/ui/layout/HomePageLayout', () => {
  return {
    HomePageLayout: ({ children }) => <div>{children}</div>,
  };
});

jest.mock('../../../src/ui/home/AthleteList', () => {
  return {
    AthleteList: () => <div>Athlete List Component</div>,
  };
});

describe('HomePage Component', () => {
  it('renders the HomePage with AthleteList', () => {
    render(<HomePage />);

    expect(screen.getByText(/Athlete List Component/i)).toBeInTheDocument();
  });
});