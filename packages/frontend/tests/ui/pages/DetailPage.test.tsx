import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import { DetailPage } from '../../../src/ui/pages/DetailPage';

jest.mock('../../../src/ui/layout/DetailAthletePageLayout', () => ({
  DetailAthletePageLayout: jest.fn(({ children }) => (
    <div>
      <h1>Detail Athlete Page Layout</h1>
      {children}
    </div>
  )),
}));

jest.mock('../../../src/ui/detail/AthleteDetail', () => ({ athleteId }: { athleteId: string }) => (
  <div>Athlete Detail Component for ID: {athleteId}</div>
));

describe('DetailPage Component', () => {
  it('renders DetailAthletePageLayout with AthleteDetail component', () => {
    render(
      <MemoryRouter initialEntries={['/athlete/123']}>
        <Route path="/athlete/:athleteId">
          <DetailPage />
        </Route>
      </MemoryRouter>
    );

    expect(screen.getByText(/Detail Athlete Page Layout/i)).toBeInTheDocument();
    expect(screen.getByText(/Athlete Detail Component for ID: 123/i)).toBeInTheDocument();
  });
});