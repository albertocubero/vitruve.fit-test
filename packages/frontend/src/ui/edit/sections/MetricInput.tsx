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
    <div className="w-full mt-4">
      <label className="text-gray-700 dark:text-gray-200" htmlFor={name}>
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <input
            id={name}
            type={type}
            className={`block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400/70 dark:placeholder-gray-500 bg-white border rounded-lg focus:outline-none focus:ring ${
              error
                ? 'border-red-400 focus:border-red-400 focus:ring-red-300 dark:border-red-400 dark:focus:border-red-300'
                : 'border-gray-300 focus:border-blue-400 dark:border-gray-600 dark:focus:border-blue-300'
            }`}
            {...field}
          />
        )}
      />
      {error && (
        <p className="mt-2 text-xs text-red-400 dark:text-red-300">{error}</p>
      )}
    </div>
  );
};

export default React.memo(ControlledInput);
