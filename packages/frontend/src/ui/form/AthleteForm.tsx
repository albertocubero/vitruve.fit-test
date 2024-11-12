import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import FormInputField from './FormInputField';
import { IAthleteFormValues } from '../types/IAthleteFormValues';
import { IAthlete } from '../../domain/types/IAthlete';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  age: Yup.number()
    .nullable()
    .transform((value, originalValue) =>
      originalValue === '' ? null : Number(originalValue)
    )
    .required('Age is required')
    .positive('Age must be a positive number')
    .integer('Age must be an integer')
    .min(1, 'Age must be at least 1'),
  team: Yup.string().required('Team is required'),
});

interface AthleteFormProps {
  athlete?: IAthlete;
  onSubmit: (data: IAthleteFormValues) => void;
  resetOnPerform?: boolean;
}

const AthleteForm: React.FC<AthleteFormProps> = ({
  athlete,
  onSubmit,
  resetOnPerform = false,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<IAthleteFormValues>({
    defaultValues: { name: '', age: 0, team: '' },
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  useEffect(() => {
    if (athlete) {
      reset(athlete);
    }
  }, [athlete, reset]);

  const handleFormSubmit = (data: IAthleteFormValues) => {
    onSubmit(data);
    if (resetOnPerform) {
      reset();
    }
  };

  return (
    <div className="w-full mx-auto mt-8 overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 border border-2 border-gray-200 dark:border-gray-700">
      <div className="px-6 py-4">
        <form onSubmit={handleSubmit(handleFormSubmit)}>
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
            min={1}
          />
          <FormInputField
            label="Team"
            name="team"
            control={control}
            error={errors.team?.message}
          />
          <div className="mt-6 text-right">
            <button
              type="submit"
              disabled={!isValid}
              className={`px-6 py-2 text-sm font-medium text-white rounded-lg ${
                !isValid ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-400'
              } focus:outline-none focus:ring-2 focus:ring-blue-300`}
            >
              Save Athlete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default React.memo(AthleteForm);
