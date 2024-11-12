import React from 'react';
import PageHeader from '../common/page/PageHeader';

const DetailPageHeader: React.FC = () => {
  return (
    <PageHeader title="Athlete Profile" />
  );
};

export default React.memo(DetailPageHeader);
