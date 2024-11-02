import React, { useCallback, useEffect, useState } from 'react';
import MetricList from '../metrics/MetricList';
import AddMetricForm from '../metrics/AddMetricForm';
import { Metric } from '../../types/Metric';
import { useAthleteMetrics } from '../../hooks/useAthleteMetrics';
import LoadingErrorMessage from '../LoadingErrorMessage';

interface MetricsSectionProps {
  athleteId: string;
}

const MetricsSection: React.FC<MetricsSectionProps> = ({ athleteId }) => {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const { data: metricsData, error: metricsError, isLoading: isMetricsLoading } = useAthleteMetrics(athleteId);

  useEffect(() => {
    if (metricsData) {
      setMetrics(metricsData);
    }
  }, [metricsData]);

  const handleMetricAdded = useCallback((newMetric: Metric) => {
    setMetrics((prevMetrics) => [...prevMetrics, newMetric]);
  }, []);

  return (
    <div>
      <LoadingErrorMessage isLoading={isMetricsLoading} error={metricsError?.message} />
      {!isMetricsLoading && !metricsError && <MetricList metrics={metrics || []} />}
      <AddMetricForm athleteId={athleteId} onMetricAdded={handleMetricAdded} />
    </div>
  );
};

export default MetricsSection;
