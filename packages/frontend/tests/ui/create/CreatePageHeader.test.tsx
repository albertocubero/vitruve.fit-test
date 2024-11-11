import React from 'react';
import { render, screen } from '@testing-library/react';
import CreatePageHeader from '../../../src/ui/create/CreatePageHeader';
import PageHeader from '../../../src/ui/common/page/PageHeader';

jest.mock('../../../src/ui/common/page/PageHeader', () => {
  return jest.fn(() => <div>Mocked PageHeader</div>);
});

describe('CreatePageHeader', () => {
  it('renders PageHeader with the correct title', () => {
    render(<CreatePageHeader />);

    expect(screen.getByText('Mocked PageHeader')).toBeInTheDocument();

    expect(PageHeader).toHaveBeenCalledWith(
      expect.objectContaining({ title: "Create Athlete" }),
      {}
    );
  });
});