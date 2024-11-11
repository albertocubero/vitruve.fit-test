import React from 'react';
import { render, screen } from '@testing-library/react';
import AthleteMetricsEmpty from '../../../../src/ui/detail/sections/AthleteMetricsEmpty';

jest.mock('../../../../src/ui/common/icons/MagnifyingGlassIcon', () => () => <div>Icon</div>);

describe('AthleteMetricsEmpty', () => {
  it('renders correctly', () => {
    render(<AthleteMetricsEmpty />);

    expect(screen.getByText('No metrics found')).toBeInTheDocument();
    expect(screen.getByText('Icon')).toBeInTheDocument();
  });
});