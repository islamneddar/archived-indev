import React from 'react';
import {DropdownChangeEvent} from 'primereact/dropdown';
import SearchInput from '@/app-page-component/components/SearchInput';
import './ai-tool-body-filters.css';
import {Button} from 'primereact/button';

interface AiToolsBodyFiltersProps {
  selectedAiToolPricing: any;
  aiPricingModes: any;
  placeholder: string;
  onChange: (e: DropdownChangeEvent) => void;
  onChangeSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchClick: () => void;
}

function AiToolsHeaderFilters(props: AiToolsBodyFiltersProps) {
  return (
    <div className={'flex pl-5 py-5 w-full'}>
      <div className="card flex justify-between items-center w-full">
        <div className={' w-full flex flex-row'}>
          <div
            className={
              'flex flex-row bg-white w-full justify-center items-center px-1 py-1 rounded'
            }>
            <SearchInput
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                props.onChangeSearch(e);
              }}
              placeholder={props.placeholder}></SearchInput>
            <div>
              <button
                className={
                  'px-3 py-3 bg-indigo-500 rounded hover:bg-indigo-700'
                }>
                <p className={'text-sm'}>Search</p>
              </button>
            </div>
          </div>
        </div>
        {/*<div className="card flex justify-content-center">
            <Dropdown
              value={props.selectedAiToolPricing}
              onChange={(e: DropdownChangeEvent) => props.onChange(e)}
              options={props.aiPricingModes}
              optionLabel="name"
              placeholder="Select a Pricing Mode"
              className="w-full md:w-14rem "
            />
          </div>*/}
      </div>
    </div>
  );
}

export default AiToolsHeaderFilters;
