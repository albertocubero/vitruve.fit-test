import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Athlete } from '../types/Athlete';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  age: Yup.number().required('Age is required').positive().integer(),
  team: Yup.string().required('Team is required'),
});

export interface AthleteFormValues {
  name: string;
  age: number;
  team: string;
}

interface AthleteFormProps {
  athlete?: Athlete;
  onSubmit: (data: AthleteFormValues) => void;
}

const AthleteForm: React.FC<AthleteFormProps> = ({ athlete, onSubmit }) => {
  const { control, handleSubmit, reset } = useForm<AthleteFormValues>({
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
      <div>
        <label>Name</label>
        <Controller
          name="name"
          control={control}
          render={({ field }) => <input {...field} />}
        />
      </div>
      <div>
        <label>Age</label>
        <Controller
          name="age"
          control={control}
          render={({ field }) => <input type="number" {...field} />}
        />
      </div>
      <div>
        <label>Team</label>
        <Controller
          name="team"
          control={control}
          render={({ field }) => <input {...field} />}
        />
      </div>
      <button type="submit">Save Athlete</button>
    </form>
  );
};

export default AthleteForm;
