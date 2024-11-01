import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { athleteService } from '../services/athleteService';
import { Athlete } from '../types/Athlete';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  age: Yup.number().required('Age is required').positive().integer(),
  team: Yup.string().required('Team is required'),
});

const AthleteForm: React.FC = () => {
  const queryClient = useQueryClient();
  const { athleteId } = useParams<{ athleteId: string }>();

  const { data: athlete, error, isLoading } = useQuery<Athlete, Error>(
    ['athlete', athleteId],
    () => athleteService.getAthlete(athleteId),
    { enabled: !!athleteId }
  );
  
  const { control, handleSubmit, reset } = useForm<Athlete>({
    defaultValues: { name: '', age: 0, team: '' },
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (athlete) {
      reset(athlete);
    }
  }, [athlete, reset]);

  const mutation = useMutation(athleteService.saveAthlete, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(['athlete', athleteId]);
      reset();
    },
  });

  const onSubmit = (data: Athlete) => {
    console.log("Submitting data:", data); // Ver los datos enviados

    mutation.mutate(data);
  };

  if (isLoading) return <p>Loading athlete...</p>;
  if (error) return <p>Error loading athlete</p>;

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
      {mutation.isError && <p>Error saving athlete</p>}
    </form>
  );
};

export default AthleteForm;
