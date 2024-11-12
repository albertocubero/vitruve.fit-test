import React from 'react';
import BackButton from '../BackButton';

interface AthleteProfileHeaderProps {
  title: string;
}

const PageHeader: React.FC<AthleteProfileHeaderProps> = ({ title }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-x-3">
        <BackButton />
        <h2 className="text-lg font-medium text-gray-100">{title}</h2>
      </div>
    </div>
  );
};

export default React.memo(PageHeader);
