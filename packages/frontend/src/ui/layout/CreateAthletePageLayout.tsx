import React, { ReactNode } from 'react';
import { PageLayout } from './sections/Page';

interface CustomPageProps {
  children?: ReactNode;
}

export const CreateAthletePageLayout: React.FC<CustomPageProps> = ({
  children,
}) => {
  const pageProps = {
    title: 'Performance Tracking Dashboard',
    subTitle: 'Create Athlete',
    description: `This page allows you to create a new athlete profile. You can input essential information, set goals, and customize training preferences to get started on the right track. It's the first step to optimizing performance and managing progress efficiently.`,
  };

  return <PageLayout {...pageProps} children={children} />;
};
