import React from 'react';
import { render, screen } from '@testing-library/react';
import { PageLayout } from '../../../../src/ui/layout/sections/Page';

jest.mock('../../../../src/ui/layout/sections/Logo', () => ({
    Logo: () => <div role="img" aria-label="Logo" />
}));
jest.mock('../../../../src/ui/layout/sections/Buttons', () => ({
  GitHubHighLightButton: () => <button>GitHub</button>,
  LinkedInHighLightButton: () => <button>LinkedIn</button>,
  VitruveFitButton: () => <button>VitruveFit</button>,
}));
jest.mock('../../../../src/ui/layout/sections/InfoSection', () => ({ title, subTitle, description }) => (
  <div>
    <h1>{title}</h1>
    <h2>{subTitle}</h2>
    <p>{description}</p>
  </div>
));

describe('PageLayout Component', () => {
  it('renders the logo and buttons correctly', () => {
    render(
      <PageLayout title="Test Title" subTitle="Test Subtitle" description="Test Description">
        <div>Child Content</div>
      </PageLayout>
    );

    expect(screen.getByRole('img', { name: /logo/i })).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /github/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /linkedin/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /vitruvefit/i })).toBeInTheDocument();
  });

  it('renders the InfoSection with correct props', () => {
    render(
      <PageLayout title="Test Title" subTitle="Test Subtitle" description="Test Description">
        <div>Child Content</div>
      </PageLayout>
    );

    expect(screen.getByRole('heading', { name: /test title/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /test subtitle/i })).toBeInTheDocument();
    expect(screen.getByText(/test description/i)).toBeInTheDocument();
  });

  it('renders children correctly', () => {
    render(
      <PageLayout title="Test Title" subTitle="Test Subtitle" description="Test Description">
        <div>Child Content</div>
      </PageLayout>
    );

    expect(screen.getByText(/child content/i)).toBeInTheDocument();
  });
});