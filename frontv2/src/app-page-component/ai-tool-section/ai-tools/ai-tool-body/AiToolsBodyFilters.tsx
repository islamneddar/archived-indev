import React from 'react';
import {Dropdown, DropdownChangeEvent} from 'primereact/dropdown';
import SearchInput from '@/app-page-component/components/SearchInput';
import './ai-tool-body-filters.css';
import {MagnifyingGlassCircleIcon} from '@heroicons/react/24/solid';

interface AiToolsBodyFIltersProps {
  selectedAiToolPricing: any;
  aiPricingModes: any;
  placeholder: string;
  onChange: (e: DropdownChangeEvent) => void;
  onChangeSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchClick: () => void;
}

function AiToolsBodyFilters(props: AiToolsBodyFIltersProps) {
  return (
    <div className={'flex pl-5 py-5 w-full'}>
      <div className="card flex justify-between items-center w-full">
        <div className={'w-354 flex flex-row'}>
          <SearchInput
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              props.onChangeSearch(e);
            }}
            placeholder={props.placeholder}></SearchInput>
          <div className={'flex justify-center items-center'}>
            <MagnifyingGlassCircleIcon
              className={'h-10 w-10 text-gray-500 cursor-pointer'}
              onClick={() => {
                props.onSearchClick();
              }}
            />
          </div>
        </div>
        <div className="card flex justify-content-center">
          <Dropdown
            value={props.selectedAiToolPricing}
            onChange={(e: DropdownChangeEvent) => props.onChange(e)}
            options={props.aiPricingModes}
            optionLabel="name"
            placeholder="Select a Pricing Mode"
            className="w-full md:w-14rem "
          />
        </div>
      </div>
    </div>
  );
}

export default AiToolsBodyFilters;
