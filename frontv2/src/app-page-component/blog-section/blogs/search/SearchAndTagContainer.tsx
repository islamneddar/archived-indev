import React from 'react';
import SearchBlogInput from '@/app-page-component/blog-section/blogs/searchBlogInput';
import {MagnifyingGlassCircleIcon} from '@heroicons/react/24/solid';
import Select from 'react-select';

export interface TagOption {
  readonly value: string; //id
  readonly label: string;
}

export const tagOptions: readonly TagOption[] = [
  {value: 'ocean', label: 'Ocean'},
  {value: 'blue', label: 'Blue'},
  {value: 'purple', label: 'Purple'},
  {value: 'red', label: 'Red'},
  {value: 'orange', label: 'Orange'},
  {value: 'yellow', label: 'Yellow'},
  {value: 'green', label: 'Green'},
  {value: 'forest', label: 'Forest'},
  {value: 'slate', label: 'Slate'},
  {value: 'silver', label: 'Silver'},
];

interface SearchAndTagContainerProps {
  searchPhrase: string;
  setSearchPhrase: (searchPhrase: string) => void;
  search: () => void;
  lastSearchPhrase: string;
}
function SearchAndTagContainer(props: SearchAndTagContainerProps) {
  const [typeOfSearch, setTypeOfSearch] = React.useState<'tag' | 'search'>(
    'search',
  );

  if (typeOfSearch === 'tag') {
    return (
      <div className={'flex w-full h-10 my-3 gap-x-3'}>
        <div className={'flex'}>
          <div className={'flex justify-center items-center'}>
            <p
              className={'cursor-pointer bg-indigo-500 p-2 rounded-xl'}
              onClick={() => {
                setTypeOfSearch('search');
              }}>
              Search
            </p>
          </div>
        </div>
        <div className={'w-full flex '}>
          <Select
            isMulti
            name="tags"
            options={tagOptions}
            className="basic-multi-select w-full text-black"
            classNamePrefix="select text-black bg-red-500"
            onChange={e => {
              console.log(e);
            }}
            styles={{
              control: (provided, state) => ({
                ...provided,
                maxHeight: '36px',
                overflowY: 'scroll',
              }),
            }}
          />
          <div className={'flex justify-center items-center'}>
            <MagnifyingGlassCircleIcon
              className={'h-10 w-10 text-gray-500 cursor-pointer'}
              onClick={() => {
                console.log('search by tag');
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={'flex w-full h-10 my-3 gap-x-3'}>
      <div
        className={'flex flex-1'}
        onKeyPress={e => {
          if (
            props.lastSearchPhrase !== props.searchPhrase &&
            e.key === 'Enter'
          ) {
            props.search();
          }
        }}>
        <SearchBlogInput
          onChange={e => {
            props.setSearchPhrase(e.target.value);
          }}
        />
        <div className={'flex justify-center items-center'}>
          <MagnifyingGlassCircleIcon
            className={'h-10 w-10 text-gray-500 cursor-pointer'}
            onClick={() => {
              if (props.searchPhrase !== props.lastSearchPhrase) {
                props.search();
              }
            }}
          />
        </div>
      </div>
      {/*<div className={'flex'}>
          <div className={'flex justify-center items-center'}>
            <p
              className={'cursor-pointer bg-indigo-500 p-2 rounded-xl'}
              onClick={() => {
                setTypeOfSearch('tag');
              }}>
              By Tags
            </p>
          </div>
        </div>*/}
    </div>
  );
}

export default SearchAndTagContainer;
