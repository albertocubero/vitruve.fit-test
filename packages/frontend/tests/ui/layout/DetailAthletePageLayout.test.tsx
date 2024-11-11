import React from 'react';
import { render, screen } from '@testing-library/react';
import { DetailAthletePageLayout } from '../../../src/ui/layout/DetailAthletePageLayout';
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

describe('DetailAthletePageLayout Component', () => {
  it('renders PageLayout with correct props', () => {
    const ChildrenComponent = () => <div>Details of the athlete</div>;
    render(
      <DetailAthletePageLayout>
        <ChildrenComponent />
      </DetailAthletePageLayout>
    );

    expect(PageLayout).toHaveBeenCalledWith(
      {
        title: 'Performance Tracking Dashboard',
        subTitle: 'Athlete Profile',
        description: 
          `This page provides a detailed view of the athlete profile. You can review their personal information, track performance metrics, and assess progress over time. It's the perfect place to analyze achievements and identify areas for improvement.`,
        children: <ChildrenComponent />,
      },
      {}
    );

    expect(screen.getByText(/details of the athlete/i)).toBeInTheDocument();
  });
});