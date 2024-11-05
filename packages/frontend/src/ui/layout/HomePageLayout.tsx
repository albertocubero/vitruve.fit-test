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
      'This dashboard helps athletes and coaches manage profiles and performance metrics to optimize training and track progress.',
  };

  return <PageLayout {...pageProps} children={children} />;
};
