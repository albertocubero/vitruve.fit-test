import React, { ReactNode } from 'react';
import { PageLayout } from './sections/Page';

interface CustomPageProps {
  children?: ReactNode;
}

export const DetailAthletePageLayout: React.FC<CustomPageProps> = ({
  children,
}) => {
  const pageProps = {
    title: 'Performance Tracking Dashboard',
    subTitle: 'Athlete Profile',
  description: 
    `This page provides a detailed view of the athlete profile. You can review their personal information, track performance metrics, and assess progress over time. It's the perfect place to analyze achievements and identify areas for improvement.`
  };

  return <PageLayout {...pageProps} children={children} />;
};
