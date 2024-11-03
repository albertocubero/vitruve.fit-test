import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import FormInputField from './FormInputField';

import { IAthlete } from '../../../domain/types/IAthlete';
import { IAthleteFormValues } from '../types/IAthleteFormValues';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  age: Yup.number()
    .required('Age is required')
    .positive()
    .integer()
    .min(1, 'Age must be at least 1'),
  team: Yup.string().required('Team is required'),
});

interface AthleteFormProps {
  athlete?: IAthlete;
  onSubmit: (data: IAthleteFormValues) => void;
}

const AthleteForm: React.FC<AthleteFormProps> = ({ athlete, onSubmit }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IAthleteFormValues>({
    defaultValues: { name: '', age: 0, team: '' },
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (athlete) {
      reset(athlete);
    }
  }, [athlete, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormInputField
        label="Name"
        name="name"
        control={control}
        error={errors.name?.message}
      />
      <FormInputField
        label="Age"
        name="age"
        control={control}
        error={errors.age?.message}
        type="number"
      />
      <FormInputField
        label="Team"
        name="team"
        control={control}
        error={errors.team?.message}
      />
      <button type="submit">Save Athlete</button>
    </form>
  );
};

export default AthleteForm;