import React from 'react';
import MetricList from '../metrics/MetricList';
import AddMetricForm from './AddMetricForm';
import { useGetAthleteMetrics } from '../../hooks/metric/useGetAthleteMetrics';
import LoadingErrorMessage from '../LoadingErrorMessage';

interface MetricsSectionProps {
  athleteId: string;
}

const MetricsSection: React.FC<MetricsSectionProps> = ({ athleteId }) => {
  const {
    data: metrics,
    error: metricsError,
    isLoading: isMetricsLoading,
  } = useGetAthleteMetrics(athleteId);

  return (
    <>
      <h3>Metrics</h3>
      <LoadingErrorMessage
        isLoading={isMetricsLoading}
        error={metricsError?.message}
      />
      {metrics && metrics.length > 0 ? (
        <MetricList metrics={metrics} />
      ) : (
        <div>There are no metrics.</div>
      )}
      <AddMetricForm athleteId={athleteId} />
    </>
  );
};

export default MetricsSection;
