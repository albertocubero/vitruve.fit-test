import React from 'react';
import { Metric } from '../../types/Metric';

interface MetricListProps {
  metrics: Metric[];
}

const MetricList: React.FC<MetricListProps> = ({ metrics=[] }) => {
  if(!metrics || metrics.length === 0 ) return null;

  return (
    <>
    <h3>Metrics</h3>
    <ul>
      {metrics.map((metric) => (
        <li key={metric.id}>
          {metric.metricType}: {metric.value} {metric.unit} at {new Date(metric.timestamp).toLocaleString()}
        </li>
      ))}
    </ul>
  </>
  )
};

export default MetricList;
