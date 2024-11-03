import React, { ReactNode } from 'react';
import { PageLayout } from './Page';

interface CustomPageProps {
  children?: ReactNode;
}

export const HomePageLayout: React.FC<CustomPageProps> = ({ children }) => {
  const pageProps = {
    title: 'Performance Tracking Dashboard',
    subTitle: 'Monitor Your Progress',
    description:
      'This dashboard allows athletes and coaches to view and manage athlete profiles as well as performance metrics. With intuitive tools and a user-friendly interface, you can track your progress and optimize your training to achieve your goals.',
  };

  return <PageLayout {...pageProps} children={children} />;
};
