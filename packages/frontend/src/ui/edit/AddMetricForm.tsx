import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import MetricInput from './MetricInput';
import { useAddAthleteMetrics } from '../hooks/metric/useAddAthleteMetrics';
import { IMetric } from '../../domain/types/IMetric';
import SuccessMessage from '../common/SuccessMessage';
import ErrorMessage from '../common/ErrorMessage';

interface AddMetricFormProps {
  athleteId: string;
}

interface MetricFormValues {
  metricType: string;
  value: number;
  unit: string;
}

const validationSchema = Yup.object().shape({
  metricType: Yup.string().required('Metric Type is required'),
  value: Yup.number()
    .required('Value is required')
    .positive('Value must be positive')
    .typeError('Value must be a number'),
  unit: Yup.string().required('Unit is required'),
});

const AddMetricForm: React.FC<AddMetricFormProps> = React.memo(
  ({ athleteId }) => {
    const [isMetricCreatedSuccessful, setIsMetricCreatedSuccessful] = useState(false);
    const { addMetric, isSuccess, isError: isMetricCreatedError } = useAddAthleteMetrics();

    const {
      control,
      handleSubmit,
      reset,
      formState: { errors, isValid },
    } = useForm<MetricFormValues>({
      resolver: yupResolver(validationSchema),
    });

    const onSubmit = useCallback(
      async (data: MetricFormValues) => {
        const newMetric: IMetric = {
          athleteId,
          metricType: data.metricType,
          value: data.value,
          unit: data.unit,
          timestamp: new Date(),
        };

        try {
          addMetric(newMetric);
          reset();
        } catch (error) {
          console.error('Failed to add metric:', error);
        }
      },
      [athleteId, addMetric, reset]
    );

    useEffect(() => {
      if (isSuccess) {
        setIsMetricCreatedSuccessful(true);
        setTimeout(() => setIsMetricCreatedSuccessful(false), 5000);
      }
    }, [isSuccess]);

    return (
      <div className="w-full mx-auto mt-8 overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 border border-2 border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Add Metric
          </h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <MetricInput
              name="metricType"
              control={control}
              label="Metric Type"
              error={errors.metricType?.message}
            />
            <MetricInput
              name="value"
              control={control}
              label="Value"
              type="number"
              error={errors.value?.message}
            />
            <MetricInput
              name="unit"
              control={control}
              label="Unit"
              error={errors.unit?.message}
            />
            <div className="mt-6 text-right">
              <button
                type="submit"
                disabled={!isValid}
                className={`px-6 py-2 text-sm font-medium text-white rounded-lg ${
                  !isValid ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-400'
                } focus:outline-none focus:ring-2 focus:ring-blue-300`}
              >
                Add Metric
              </button>
            </div>
          </form>
        </div>
        {isMetricCreatedSuccessful && <SuccessMessage message="The metric was created!" />}
        {isMetricCreatedError && <ErrorMessage message="Failed to create the metric. Please check the input data and try again." />}
      </div>
    );
  }
);

export default AddMetricForm;
