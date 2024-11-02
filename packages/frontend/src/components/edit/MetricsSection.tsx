import React, { useCallback, useEffect, useState } from 'react';
import MetricList from '../metrics/MetricList';
import AddMetricForm from '../metrics/AddMetricForm';
import { Metric } from '../../types/Metric';
import { useGetAthleteMetrics } from '../../hooks/metric/useGetAthleteMetrics';
import LoadingErrorMessage from '../LoadingErrorMessage';

interface MetricsSectionProps {
  athleteId: string;
}

const MetricsSection: React.FC<MetricsSectionProps> = ({ athleteId }) => {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const { data: metricsData, error: metricsError, isLoading: isMetricsLoading } = useGetAthleteMetrics(athleteId);

  const handleMetricAdded = useCallback((newMetric: Metric) => {
    setMetrics((prevMetrics) => [...prevMetrics, newMetric]);
  }, []);

  useEffect(() => {
    if (metricsData) {
      setMetrics(metricsData);
    }
  }, [metricsData]);

  return (
    <div>
      <LoadingErrorMessage isLoading={isMetricsLoading} error={metricsError?.message} />
      {!isMetricsLoading && !metricsError && <MetricList metrics={metrics || []} />}
      <AddMetricForm athleteId={athleteId} onMetricAdded={handleMetricAdded} />
    </div>
  );
};

export default MetricsSection;
