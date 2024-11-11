import React from 'react';
import { render, screen } from '@testing-library/react';
import { CreatePage } from '../../../src/ui/pages/CreatePage';

jest.mock('../../../src/ui/layout/CreateAthletePageLayout', () => ({
  CreateAthletePageLayout: jest.fn(({ children }) => (
    <div>
      <h1>Create Athlete Page Layout</h1>
      {children}
    </div>
  )),
}));

jest.mock('../../../src/ui/create/CreateAthlete', () => () => (
  <div>Create Athlete Component</div>
));

describe('CreatePage Component', () => {
  it('renders CreateAthletePageLayout with CreateAthlete component', () => {
    render(<CreatePage />);

    expect(screen.getByText(/Create Athlete Page Layout/i)).toBeInTheDocument();
    expect(screen.getByText(/Create Athlete Component/i)).toBeInTheDocument();
  });
});