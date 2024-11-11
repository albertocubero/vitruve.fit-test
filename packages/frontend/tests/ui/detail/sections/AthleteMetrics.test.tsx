import React from 'react';
import { render, screen } from '@testing-library/react';
import AthleteMetrics from '../../../../src/ui/detail/sections/AthleteMetrics';
import { useGetAthleteMetrics } from '../../../../src/ui/hooks/metric/useGetAthleteMetrics';

jest.mock('../../../../src/ui/hooks/metric/useGetAthleteMetrics');
jest.mock('../../../../src/ui/common/Loading', () => () => (
  <div>Loading...</div>
));
jest.mock('../../../../src/ui/common/ErrorMessage', () => ({ message }) => (
  <div>{message}</div>
));
jest.mock(
  '../../../../src/ui/detail/sections/AthleteMetricsEmpty',
  () => () => <div>No Metrics Available</div>
);
jest.mock('../../../../src/ui/metrics/MetricList', () => () => (
  <div>Metric List</div>
));

describe('AthleteMetrics', () => {
  const athleteId = '123';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state', () => {
    (useGetAthleteMetrics as jest.Mock).mockReturnValue({
      isLoading: true,
      data: null,
      error: null,
    });

    render(<AthleteMetrics athleteId={athleteId} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders metrics when available', () => {
    (useGetAthleteMetrics as jest.Mock).mockReturnValue({
      isLoading: false,
      data: [{ id: '1', value: 10 }],
      error: null,
    });

    render(<AthleteMetrics athleteId={athleteId} />);
    expect(screen.getByText('Metric List')).toBeInTheDocument();
  });

  it('renders empty state when no metrics are available', () => {
    (useGetAthleteMetrics as jest.Mock).mockReturnValue({
      isLoading: false,
      data: [],
      error: null,
    });

    render(<AthleteMetrics athleteId={athleteId} />);
    expect(screen.getByText('No Metrics Available')).toBeInTheDocument();
  });

  it('renders error message when there is an error', () => {
    (useGetAthleteMetrics as jest.Mock).mockReturnValue({
      isLoading: false,
      data: null,
      error: { message: 'Error fetching metrics' },
    });

    render(<AthleteMetrics athleteId={athleteId} />);
    expect(screen.getByText('Error fetching metrics')).toBeInTheDocument();
  });
});
