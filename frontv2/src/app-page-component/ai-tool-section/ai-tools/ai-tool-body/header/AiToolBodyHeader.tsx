'use client';
import React from 'react';
import {AiToolCategoryEnum} from '@/infra/enums/ai-tool/ai-tool-category.enum';
import {LocalStorageService} from '@/infra/external-service/local-storage/local-storage.service';

interface AiToolBodyHeaderProps {
  category?: string;
  aiToolNumber?: number;
}
function AiToolBodyHeader(props: AiToolBodyHeaderProps) {
  const aiToolCategoryMap =
    LocalStorageService.getInstance().getCategoriesAiToolMap() || {};
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
                  aiToolCategoryMap[props.category as AiToolCategoryEnum]?.name
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
