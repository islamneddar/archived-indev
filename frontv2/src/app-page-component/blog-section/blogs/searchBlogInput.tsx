import React from 'react';

interface SearchBlogInputProps {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

function SearchBlogInput(props: SearchBlogInputProps) {
  return (
    <div className={'w-full'}>
      <div className="">
        <input
          type="text"
          name="name"
          id="name"
          className="block w-full rounded-full border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="chatgpt, bard, ..."
          onChange={e => {
            props.onChange(e);
          }}
        />
      </div>
    </div>
  );
}

export default SearchBlogInput;
