import React from 'react';
import { render, screen } from '@testing-library/react';
import MetricList from '../../../src/ui/metrics/MetricList';
import { IMetric } from '../../../src/domain/types/IMetric';

const mockMetrics: IMetric[] = [
  {
    id: '1',
    athleteId: '1',
    metricType: 'Speed',
    value: 10,
    unit: 'km/h',
    timestamp: new Date("2024-11-06T02:29:46.546Z"),
  },
  {
    id: '2',
    athleteId: '2',
    metricType: 'Heart Rate',
    value: 150,
    unit: 'bpm',
    timestamp: new Date("2024-11-06T02:29:46.546Z"),
  },
];

describe('MetricList Component', () => {
  it('renders null when no metrics are provided', () => {
    render(<MetricList metrics={[]} />);
    expect(screen.queryByText(/Speed/i)).toBeNull();
  });

  it('renders the metrics correctly', () => {
    render(<MetricList metrics={mockMetrics} />);

    expect(screen.getByText(/Speed/i)).toBeInTheDocument();
    expect(screen.getByText(/10 km\/h/i)).toBeInTheDocument();
    expect(screen.getByText(/Heart Rate/i)).toBeInTheDocument();
    expect(screen.getByText(/150 bpm/i)).toBeInTheDocument();
  });
});
