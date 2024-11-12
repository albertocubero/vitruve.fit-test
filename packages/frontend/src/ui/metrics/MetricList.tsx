import React from 'react';
import { IMetric } from '../../domain/types/IMetric';

interface MetricListProps {
  metrics: IMetric[];
}

const MetricList: React.FC<MetricListProps> = ({ metrics = [] }) => {
  if (!metrics || metrics.length === 0) return null;

  return (
    <div className="space-y-4">
      {metrics.map((metric) => (
        <div
          key={metric.id}
          className="flex justify-between items-center px-4 py-2 bg-white rounded-lg shadow-md dark:bg-gray-800"
        >
          <div className="flex flex-col">
            <span className="font-semibold text-gray-800 dark:text-gray-200">
              {metric.metricType}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {metric.value} {metric.unit}
            </span>
          </div>

          <span className="text-sm text-gray-600 dark:text-gray-300">
            {new Date(metric.timestamp).toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
};

export default React.memo(MetricList);
