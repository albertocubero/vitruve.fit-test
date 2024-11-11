import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import MetricsSection from '../../../../src/ui/edit/sections/MetricsSection';
import { useGetAthleteMetrics } from '../../../../src/ui/hooks/metric/useGetAthleteMetrics';

jest.mock('../../../../src/ui/hooks/metric/useGetAthleteMetrics');
jest.mock('../../../../src/ui/common/Loading', () => () => <div>Loading...</div>);
jest.mock('../../../../src/ui/common/ErrorMessage', () => ({ message }) => <div>{message}</div>);
jest.mock('../../../../src/ui/detail/sections/AthleteMetricsEmpty', () => () => <div>No metrics available</div>);
jest.mock('../../../../src/ui/edit/sections/AddMetricForm', () => () => <div>Add Metric Form</div>);
jest.mock('../../../../src/ui/metrics/MetricList', () => ({ metrics }) => (
  <div>
    {metrics.map((metric) => (
      <div key={metric.id}>{metric.name}</div>
    ))}
  </div>
));

describe('MetricsSection', () => {
  const athleteId = '123';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('displays loading indicator while loading metrics', () => {
    (useGetAthleteMetrics as jest.Mock).mockReturnValue({
      data: null,
      error: null,
      isLoading: true,
    });

    render(<MetricsSection athleteId={athleteId} />);
    
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it('displays error message when there is an error fetching metrics', async () => {
    const errorMessage = 'Failed to fetch metrics';
    (useGetAthleteMetrics as jest.Mock).mockReturnValue({
      data: null,
      error: { message: errorMessage },
      isLoading: false,
    });

    render(<MetricsSection athleteId={athleteId} />);
    
    expect(await screen.findByText(errorMessage)).toBeInTheDocument();
  });

  it('displays empty message when there are no metrics', async () => {
    (useGetAthleteMetrics as jest.Mock).mockReturnValue({
      data: [],
      error: null,
      isLoading: false,
    });

    render(<MetricsSection athleteId={athleteId} />);

    expect(await screen.findByText(/No metrics available/i)).toBeInTheDocument();
  });

  it('displays metrics when available', async () => {
    const mockMetrics = [
      { id: '1', name: 'Speed' },
      { id: '2', name: 'Endurance' },
    ];
    (useGetAthleteMetrics as jest.Mock).mockReturnValue({
      data: mockMetrics,
      error: null,
      isLoading: false,
    });

    render(<MetricsSection athleteId={athleteId} />);

    expect(await screen.findByText('Speed')).toBeInTheDocument();
    expect(await screen.findByText('Endurance')).toBeInTheDocument();
  });

  it('renders AddMetricForm', () => {
    (useGetAthleteMetrics as jest.Mock).mockReturnValue({
      data: [],
      error: null,
      isLoading: false,
    });

    render(<MetricsSection athleteId={athleteId} />);

    expect(screen.getByText(/Add Metric Form/i)).toBeInTheDocument();
  });
});