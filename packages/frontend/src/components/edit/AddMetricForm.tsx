import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import MetricInput from './MetricInput';
import { Metric } from '../../types/Metric';
import { athleteService } from '../../services/athleteService';

interface AddMetricFormProps {
  athleteId: string;
  onMetricAdded: (metric: Metric) => void;
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

const AddMetricForm: React.FC<AddMetricFormProps> = React.memo(({ athleteId, onMetricAdded }) => {
  const { control, handleSubmit, reset, formState: { errors } } = useForm<MetricFormValues>({
    defaultValues: { metricType: '', value: 0, unit: '' },
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = useCallback(async (data: MetricFormValues) => {
    const newMetric: Metric = {
      id: '',
      athleteId,
      metricType: data.metricType,
      value: data.value,
      unit: data.unit,
      timestamp: new Date(),
    };

    try {
      const addedMetric = await athleteService.addMetric(newMetric);
      onMetricAdded(addedMetric);
      reset();
    } catch (error) {
      console.error('Failed to add metric:', error);
    }
  }, [athleteId, onMetricAdded, reset]);

  return (
    <>
      <h3>Add Metric</h3>
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
        <button type="submit">Add Metric</button>
      </form>
    </>
  );
});

export default AddMetricForm;
