import React, { useEffect, useState } from 'react';
import { Athlete } from '../../types/Athlete';
import { Metric } from '../../types/Metric';
import { useAthleteMetrics } from '../../hooks/useAthleteMetrics';
import AthleteInfo from './AthleteInfo';
import LoadingErrorMessage from '../LoadingErrorMessage';
// import MetricsSection from '../metrics/MetricsSection';
import MetricList from '../metrics/MetricList';

interface AthleteDetailProps {
  athlete: Athlete;
}

const AthleteDetail: React.FC<AthleteDetailProps> = React.memo(({ athlete }) => {
  if (!athlete.id) {
    return <div>Error: Athlete ID is required.</div>;
  }

  const [metrics, setMetrics] = useState<Metric[]>([]);
  const { data: metricsData, error: metricsError, isLoading: isMetricsLoading } = useAthleteMetrics(athlete.id);

  useEffect(() => {
    if (metricsData) {
      setMetrics(metricsData);
    }
  }, [metricsData]);

  // const handleMetricAdded = useCallback((newMetric: Metric) => {
  //   setMetrics((prevMetrics) => [...prevMetrics, newMetric]);
  // }, []);

  if (!athlete.id) {
    return <div>Error: Athlete ID is required.</div>; // Puedes manejar el error como prefieras
  }

  return (
    <div>
      <AthleteInfo athlete={athlete} />
      <LoadingErrorMessage isLoading={isMetricsLoading} error={metricsError?.message} />
      <MetricList metrics={metrics} />
      {/* <MetricsSection metrics={metrics} athleteId={athlete.id} onMetricAdded={handleMetricAdded} /> */}
    </div>
  );
});

export default AthleteDetail;
