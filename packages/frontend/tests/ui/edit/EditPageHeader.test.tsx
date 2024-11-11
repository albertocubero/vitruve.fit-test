import React from 'react';
import { render, screen } from '@testing-library/react';
import EditPageHeader from '../../../src/ui/edit/EditPageHeader';
import PageHeader from '../../../src/ui/common/page/PageHeader';

jest.mock('../../../src/ui/common/page/PageHeader', () => {
  return jest.fn(() => <div>Mocked PageHeader</div>);
});

describe('EditPageHeader', () => {
  it('renders PageHeader with correct title', () => {
    render(<EditPageHeader />);

    expect(PageHeader).toHaveBeenCalledWith(
      expect.objectContaining({ title: 'Edit Athlete' }),
      {}
    );

    expect(screen.getByText(/Mocked PageHeader/i)).toBeInTheDocument();
  });
});