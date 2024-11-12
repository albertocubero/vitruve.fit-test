import React, { ReactNode } from 'react';
import { PageLayout } from './sections/Page';

interface CustomPageProps {
  children?: ReactNode;
}

export const EditAthletePageLayout: React.FC<CustomPageProps> = React.memo(({
  children,
}) => {
  const pageProps = {
    title: 'Performance Tracking Dashboard',
    subTitle: 'Edit Athlete Progress Information',
    description: `This page lets you edit athlete profiles, update performance metrics, and adjust training data. It's an easy way to track progress, optimize workouts, and refine goals.`,
  };

  return <PageLayout {...pageProps} children={children} />;
});
