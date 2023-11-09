import React from 'react';

interface SearchInputProps {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
  inputClassName?: string;
  name?: string;
  id?: string;
}

function SearchInput(props: SearchInputProps) {
  return (
    <div className={'w-full'}>
      <input
        type="text"
        name={props.name || 'name'}
        id={props.id || 'id'}
        className={`${props.inputClassName} block w-full rounded border-0 px-4 py-1 text-gray-900 placeholder:text-gray-400  focus-visible:outline-0  sm:text-sm sm:leading-6`}
        placeholder={props.placeholder || 'chatgpt, bard, ...'}
        onChange={e => {
          props.onChange(e);
        }}
      />
    </div>
  );
}

export default SearchInput;
