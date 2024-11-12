import React from 'react';
import MetricList from '../../metrics/MetricList';
import { useGetAthleteMetrics } from '../../hooks/metric/useGetAthleteMetrics';
import Loading from '../../common/Loading';
import ErrorMessage from '../../common/ErrorMessage';
import AthleteMetricsEmpty from './AthleteMetricsEmpty';

interface AthleteMetricsProps {
  athleteId: string;
}

const AthleteMetrics: React.FC<AthleteMetricsProps> = ({ athleteId }) => {
  const {
    data: metrics,
    error: metricsError,
    isLoading: isMetricsLoading,
  } = useGetAthleteMetrics(athleteId);

  return (
    <div className="py-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-3">
          <h2 className="text-lg font-medium text-gray-100">Metrics</h2>
        </div>
      </div>
      {isMetricsLoading && <Loading />}
      <div className="mt-6">
        {metrics && metrics.length > 0 ? (
          <MetricList metrics={metrics} />
        ) : (
          <AthleteMetricsEmpty />
        )}
      </div>
      {metricsError && <ErrorMessage message={metricsError?.message} />}
    </div>
  );
};

export default React.memo(AthleteMetrics);
