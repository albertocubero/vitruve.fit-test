import React from 'react';

interface InfoSectionProps {
  title: string;
  subTitle: string;
  description: string;
}

const InfoSection: React.FC<InfoSectionProps> = ({
  title,
  subTitle,
  description,
}) => {
  return (
    <>
      <h2 className="text-3xl font-semibold text-gray-100 lg:text-4xl">
        <span className="text-blue-400">{title}</span>
      </h2>
      <h3 className="mt-4 text-2xl font-semibold text-gray-100">{subTitle}</h3>
      <p className="mt-4 text-gray-100">{description}</p>
    </>
  );
};

export default InfoSection;
