import React from 'react';
import MetricList from '../../metrics/MetricList';
import AddMetricForm from './AddMetricForm';
import { useGetAthleteMetrics } from '../../hooks/metric/useGetAthleteMetrics';
import Loading from '../../common/Loading';
import ErrorMessage from '../../common/ErrorMessage';
import AthleteMetricsEmpty from '../../detail/sections/AthleteMetricsEmpty';

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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-3">
          <h2 className="text-lg font-medium text-gray-100">Metrics</h2>
        </div>
      </div>
      {isMetricsLoading && <Loading />}
      <div className="space-y-6">
        <AddMetricForm athleteId={athleteId} />
        {metrics && metrics.length > 0 ? (
          <MetricList metrics={metrics} />
        ) : (
          <AthleteMetricsEmpty />
        )}
      </div>

      {metricsError && <ErrorMessage message={metricsError?.message} />}
    </>
  );
};

export default MetricsSection;
