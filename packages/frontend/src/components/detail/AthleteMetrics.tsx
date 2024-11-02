import React from 'react';
import LoadingErrorMessage from '../LoadingErrorMessage';
import MetricList from '../metrics/MetricList';
import { useGetAthleteMetrics } from '../../hooks/metric/useGetAthleteMetrics';

interface AthleteMetricsProps {
  athleteId: string;
}

const AthleteMetrics: React.FC<AthleteMetricsProps> = ({ athleteId }) => {
  const { data: metrics, error: metricsError, isLoading: isMetricsLoading } = useGetAthleteMetrics(athleteId);

  return (
    <>
      <h3>Metrics</h3>
      <LoadingErrorMessage isLoading={isMetricsLoading} error={metricsError?.message} />
      {metrics && metrics.length > 0 ? (
        <MetricList metrics={metrics} />
      ) : (
        <div>There are no metrics.</div>
      )}
    </>
  );
};

export default AthleteMetrics;
