import React from 'react';
import { Link } from "react-router-dom";

export const VitruveFitButton: React.FC = () => {
    const href = 'https://vitruve.fit/';
    const title = 'Vitruve';
  
    return (
      <Link
        to={{ pathname: href }}
        target="_blank"
        rel="noopener noreferrer"
        className="px-3 py-2 mx-2 text-sm font-semibold text-white transition-colors duration-300 transform bg-black rounded-md hover:bg-gray-800"
      >
        {title}
      </Link>
    );
  };
  
  export const LinkedInHighLightButton: React.FC = () => {
    const href = 'https://www.linkedin.com/in/alberto-cubero-navas/';
    const title = 'LinkedIn';
  
    return <HighLightButton href={href} title={title} />;
  };
  
  export const GitHubHighLightButton: React.FC = () => {
    const href = 'https://github.com/albertocubero';
    const title = 'GitHub';
  
    return <HighLightButton href={href} title={title} />;
  };
  
  interface HighLightButtonProps {
    href: string;
    title: string;
  }
  
  const HighLightButton: React.FC<HighLightButtonProps> = ({ href, title }) => {
    return (
      <Link
        to={{ pathname: href }}
        target="_blank"
        rel="noopener noreferrer"
        className="px-3 py-1 mx-2 text-sm font-semibold text-white transition-colors duration-300 transform border-2 rounded-md hover:bg-gray-700"
      >
        {title}
      </Link>
    );
  };