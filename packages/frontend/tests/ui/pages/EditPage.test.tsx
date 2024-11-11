import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import { EditPage } from '../../../src/ui/pages/EditPage';

import "../../../src/ui/edit/EditAthlete"

jest.mock('../../../src/ui/layout/EditAthletePageLayout', () => ({
  EditAthletePageLayout: jest.fn(({ children }) => (
    <div>
      <h1>Edit Athlete Page Layout</h1>
      {children}
    </div>
  )),
}));

jest.mock('../../../src/ui/edit/EditAthlete', () => ({
    EditAthlete: ({ athleteId }: { athleteId: string }) => (<div>Edit Athlete Component for ID: {athleteId}</div>)
}));

describe('EditPage Component', () => {
  it('renders EditAthletePageLayout with EditAthlete component', () => {
    render(
      <MemoryRouter initialEntries={['/athlete/edit/123']}>
        <Route path="/athlete/edit/:athleteId">
          <EditPage />
        </Route>
      </MemoryRouter>
    );

    expect(screen.getByText(/Edit Athlete Page Layout/i)).toBeInTheDocument();
    expect(screen.getByText(/Edit Athlete Component for ID: 123/i)).toBeInTheDocument();
  });
});