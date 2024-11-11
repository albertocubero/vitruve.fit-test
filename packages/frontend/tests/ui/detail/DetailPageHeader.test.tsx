import React from 'react';
import { render, screen } from '@testing-library/react';
import DetailPageHeader from '../../../src/ui/detail/DetailPageHeader';
import PageHeader from '../../../src/ui/common/page/PageHeader';

jest.mock('../../../src/ui/common/page/PageHeader', () => {
  return jest.fn(({ title }) => <div>{title}</div>);
});

describe('DetailPageHeader', () => {
  it('renders correctly with the correct title', () => {
    render(<DetailPageHeader />);

    expect(screen.getByText('Athlete Profile')).toBeInTheDocument();
    expect(PageHeader).toHaveBeenCalledWith({ title: "Athlete Profile" }, {});
  });
});