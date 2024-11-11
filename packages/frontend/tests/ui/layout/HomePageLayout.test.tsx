import React from 'react';
import { render, screen } from '@testing-library/react';
import { HomePageLayout } from '../../../src/ui/layout/HomePageLayout';
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

describe('HomePageLayout Component', () => {
  it('renders PageLayout with correct props', () => {
    const ChildrenComponent = () => <div>Content of the home page</div>;
    render(
      <HomePageLayout>
        <ChildrenComponent />
      </HomePageLayout>
    );

    expect(PageLayout).toHaveBeenCalledWith(
      {
        title: 'Performance Tracking Dashboard',
        subTitle: 'Monitor Your Progress',
        description:
          'This dashboard helps athletes and coaches manage profiles and performance metrics to optimize training and track progress.',
        children: <ChildrenComponent />,
      },
      {}
    );

    expect(screen.getByText(/content of the home page/i)).toBeInTheDocument();
  });
});