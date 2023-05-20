import React from 'react';
import {ExclamationCircleIcon} from '@heroicons/react/20/solid';
import {UseFormRegister} from 'react-hook-form';
import {classNames} from '@/utils/style';

interface LabelTypes {
  labelContent?: string;
  showLabel: boolean;
  className?: string;
}

interface HintTypes {
  hintContent?: string;
  showHint: boolean;
  classNameHintContent?: string;
  hintClick?: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
}

interface InputWithValidationErrorInnoom {
  label: LabelTypes;
  hint?: HintTypes;
  type: string;
  name: string;
  id: string;
  inputClassName?: string;
  placeholder: string;
  defaultValue?: string;
  isError: boolean;
  errorMessage?: string;
  register: ReturnType<UseFormRegister<any>>;
  containerClassName?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
}

function InputWithValidationError(props: InputWithValidationErrorInnoom) {
  return (
    <div className={classNames(props.containerClassName as string)}>
      <div className="flex justify-between">
        {props.label.showLabel && (
          <label
            className={`block text-sm font-medium ${
              props.label.showLabel ? props.label.className : 'hidden'
            }`}>
            {props.label.labelContent}
          </label>
        )}
        {props.hint?.showHint && (
          <span
            className={`text-sm text-gray-500 ${props.hint.classNameHintContent}`}
            onClick={props.hint.hintClick}>
            {props.hint.hintContent}
          </span>
        )}
      </div>
      <div className="relative mt-1 rounded-md shadow-sm">
        <input
          {...props.register}
          type={props.type}
          name={props.name}
          id={props.id}
          className={`block w-full rounded-md ${
            props.isError ? 'pr-10' : ''
          } focus:outline-none ${props.inputClassName}`}
          placeholder={props.placeholder}
          defaultValue={props.defaultValue}
          onChange={props.onChange}
        />
        {props.isError && (
          <div
            className={`pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 ${
              props.isError ? '' : 'hidden'
            }`}>
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        )}
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

export default InputWithValidationError;
