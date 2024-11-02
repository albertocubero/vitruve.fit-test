import React from 'react';
import MetricList from '../metrics/MetricList';
import AddMetricForm from './AddMetricForm';
import { useGetAthleteMetrics } from '../../hooks/metric/useGetAthleteMetrics';
import LoadingErrorMessage from '../LoadingErrorMessage';

interface MetricsSectionProps {
  athleteId: string;
}

const MetricsSection: React.FC<MetricsSectionProps> = ({ athleteId }) => {
  const { data: metrics, error: metricsError, isLoading: isMetricsLoading } = useGetAthleteMetrics(athleteId);

  return (
    <div>
      <h3>Metrics</h3>
      <LoadingErrorMessage isLoading={isMetricsLoading} error={metricsError?.message} />
      {metrics && <MetricList metrics={metrics} />}
      <AddMetricForm athleteId={athleteId} />
    </div>
  );
};

export default MetricsSection;
