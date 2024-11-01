// src/components/MetricForm.tsx
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { athleteService } from '../services/athleteService';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Metric } from '../types/Metric';

const validationSchema = Yup.object().shape({
  metricType: Yup.string().required('Metric type is required'),
  value: Yup.number().required('Value is required'),
  unit: Yup.string().required('Unit is required'),
  timestamp: Yup.date().required('Timestamp is required'),
});

const MetricForm: React.FC<{ athleteId: string }> = ({ athleteId }) => {
  const queryClient = useQueryClient();
  const { control, handleSubmit, reset } = useForm<Metric>({
    defaultValues: { athleteId, metricType: '', value: 0, unit: '', timestamp: new Date() },
    resolver: yupResolver(validationSchema),
  });

  const mutation = useMutation(athleteService.addMetric, {
    onSuccess: () => {
      queryClient.invalidateQueries(['athlete', athleteId]);
      reset();
    },
  });

  const onSubmit = (data: Metric) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Metric Type</label>
        <Controller
          name="metricType"
          control={control}
          render={({ field }) => <input {...field} />}
        />
      </div>
      <div>
        <label>Value</label>
        <Controller
          name="value"
          control={control}
          render={({ field }) => <input type="number" {...field} />}
        />
      </div>
      <div>
        <label>Unit</label>
        <Controller
          name="unit"
          control={control}
          render={({ field }) => <input {...field} />}
        />
      </div>
      <div>
        <label>Timestamp</label>
        <Controller
          name="timestamp"
          control={control}
          render={({ field }) => <input type="datetime-local" {...field} />}
        />
      </div>
      <button type="submit">Add Metric</button>
      {mutation.isError && <p>Error saving metric</p>}
    </form>
  );
};

export default MetricForm;
