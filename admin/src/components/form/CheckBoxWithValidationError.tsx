import React from 'react';
import {UseFormRegister} from 'react-hook-form';

interface CheckBoxValidationError {
  register: ReturnType<UseFormRegister<any>>;
  id: string;
  name: string;
  inputClassName?: string;
  isError: boolean;
  label: string;
  errorMessage?: string;
}

function CheckBoxWithValidationError(props: CheckBoxValidationError) {
  return (
    <div className={'flex flex-col'}>
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            {...props.register}
            id={props.id}
            name={props.name}
            aria-describedby={props.name}
            type="checkbox"
            className={`w-4 h-4 border 
          border-gray-300 rounded bg-gray-50 
          focus:ring-3 focus:ring-primary-300 
          dark:bg-gray-700 dark:border-gray-600 
          dark:focus:ring-primary-600 
          dark:ring-offset-gray-800 ${props.inputClassName}`}
          />
        </div>
        <div className="ml-3 text-sm">
          <label
            htmlFor={props.id}
            className="text-gray-500 dark:text-gray-300">
            {props.label}
          </label>
        </div>
      </div>
      <p
        className={`mt-1 text-12 text-red-600 ${
          props.isError ? '' : 'hidden'
        }`}>
        {props.errorMessage}
      </p>
    </div>
  );
}

export default CheckBoxWithValidationError;
