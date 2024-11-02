import React from 'react';
import { Controller, Control } from 'react-hook-form';

interface ControlledInputProps {
  name: string;
  control: Control<any>;
  label: string;
  type?: string;
  error?: string;
  defaultValue?: string | number;
}

const ControlledInput: React.FC<ControlledInputProps> = ({
  name,
  control,
  label,
  type = 'text',
  error,
  defaultValue = '',
}) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <input
            id={name}
            type={type}
            {...field}
          />
        )}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ControlledInput;
