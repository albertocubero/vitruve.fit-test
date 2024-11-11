import React from 'react';
import { render, screen } from '@testing-library/react';
import { EditAthletePageLayout } from '../../../src/ui/layout/EditAthletePageLayout';
import { PageLayout } from '../../../src/ui/layout/sections/Page';

jest.mock('../../../src/ui/layout/sections/Page', () => ({
  PageLayout: jest.fn(({ title, subTitle, description, children }) => (
    <div>
      <h1>{title}</h1>
      <h2>{subTitle}</h2>
      <p>{description}</p>
      {children}
    </div>
  )),
}));

describe('EditAthletePageLayout Component', () => {
  it('renders PageLayout with correct props', () => {
    const ChildrenComponent = () => <div>Form to edit athlete</div>;
    render(
      <EditAthletePageLayout>
        <ChildrenComponent />
      </EditAthletePageLayout>
    );

    expect(PageLayout).toHaveBeenCalledWith(
      {
        title: 'Performance Tracking Dashboard',
        subTitle: 'Edit Athlete Progress Information',
        description: 
          `This page lets you edit athlete profiles, update performance metrics, and adjust training data. It's an easy way to track progress, optimize workouts, and refine goals.`,
        children: <ChildrenComponent />,
      },
      {}
    );

    expect(screen.getByText(/form to edit athlete/i)).toBeInTheDocument();
  });
});