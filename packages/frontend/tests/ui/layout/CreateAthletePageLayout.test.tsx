import React from 'react';
import { render, screen } from '@testing-library/react';
import { CreateAthletePageLayout } from '../../../src/ui/layout/CreateAthletePageLayout';
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

describe('CreateAthletePage Component', () => {
  it('renders PageLayout with correct props', () => {
    const ChildrenComponent = () => <div>form to create athlete</div>;
    render(
      <CreateAthletePageLayout>
        <ChildrenComponent />
      </CreateAthletePageLayout>
    );

    expect(PageLayout).toHaveBeenCalledWith(
      {
        description:
          "This page allows you to create a new athlete profile. You can input essential information, set goals, and customize training preferences to get started on the right track. It's the first step to optimizing performance and managing progress efficiently.",
        subTitle: 'Create Athlete',
        title: 'Performance Tracking Dashboard',
        children: <ChildrenComponent />,
      },
      {}
    );
    expect(screen.getByText(/form to create athlete/i)).toBeInTheDocument();
  });
});
