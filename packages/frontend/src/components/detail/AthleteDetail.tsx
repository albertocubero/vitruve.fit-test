import React, { useEffect, useState } from 'react';
import { Athlete } from '../../types/Athlete';
import { Metric } from '../../types/Metric';
import AthleteInfo from './AthleteInfo';
import LoadingErrorMessage from '../LoadingErrorMessage';
import MetricList from '../metrics/MetricList';
import { useGetAthleteMetrics } from '../../hooks/metric/useGetAthleteMetrics';

interface AthleteDetailProps {
  athlete: Athlete;
}

const AthleteDetail: React.FC<AthleteDetailProps> = React.memo(({ athlete }) => {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const { data: metricsData, error: metricsError, isLoading: isMetricsLoading } = useGetAthleteMetrics(athlete.id!);

  useEffect(() => {
    if (metricsData) {
      setMetrics(metricsData);
    }
  }, [metricsData]);

  return (
    <div>
      <AthleteInfo athlete={athlete} />
      <LoadingErrorMessage isLoading={isMetricsLoading} error={metricsError?.message} />
      <MetricList metrics={metrics} />
    </div>
  );
});

export default AthleteDetail;
