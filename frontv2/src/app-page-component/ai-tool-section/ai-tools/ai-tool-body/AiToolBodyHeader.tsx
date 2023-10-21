import React from 'react';
import {getAiToolCategoryFromCategory} from '@/infra/data/ai-tool/ai-tool-category.data';
import {AiToolCategoryEnum} from '@/infra/enums/ai-tool/ai-tool-category.enum';

interface AiToolBodyHeaderProps {
  category?: string;
  aiToolNumber?: number;
}
function AiToolBodyHeader(props: AiToolBodyHeaderProps) {
  return (
    <div className={'flex w-full h-full justify-center items-center'}>
      <div
        className={
          'text-3xl py-5 font-medium flex justify-center flex-col items-center'
        }>
        <p className={'pb-3'}>
          Explore the best AI tools{' '}
          <span className={'italic font-semibold'}>
            {props.category === 'all'
              ? ''
              : `in ${
                  getAiToolCategoryFromCategory(
                    props.category as AiToolCategoryEnum,
                  ).name
                }`}
          </span>{' '}
          Updated daily
        </p>
        <p>
          Find the right tool from our list of{' '}
          <span className={'italic font-semibold'}>
            +{props.aiToolNumber} AI tools
          </span>
        </p>
      </div>
    </div>
  );
}

export default AiToolBodyHeader;
