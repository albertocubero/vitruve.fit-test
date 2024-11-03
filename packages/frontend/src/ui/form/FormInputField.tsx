import React from 'react';
import { Controller, Control } from 'react-hook-form';

interface FormInputFieldProps {
  label: string;
  name: string;
  control: Control<any>;
  error?: string;
  type?: string;
}

const FormInputField: React.FC<FormInputFieldProps> = ({ label, name, control, error, type = "text" }) => (
  <>
    <label>{label}</label>
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <>
          <input {...field} type={type} />
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </>
      )}
    />
  </>
);

export default FormInputField;
