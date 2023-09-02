import React from 'react';
import {AiTool} from '@/types/api/ai-tools/ai-tool';
import PrimaryButton from '@/components/button/PrimaryButton';
import {
  AiToolCategoryEnum,
  getAiToolCategoryFromCategory,
} from '@/types/data/ai-tool/ai-tool-category.data';
import {getAiPricing, PricingEnum} from '@/types/data/ai-tool/ai-tool-pricing';

interface AiToolItemDialogContentProps {
  aiTool: AiTool;
}

function AiToolItemDialogContent(props: AiToolItemDialogContentProps) {
  const aiTool = props.aiTool;
  return (
    <div className={'flex px-5 py-3 w-full'}>
      <div className={'flex w-full flex-col'}>
        <div className={'flex w-full justify-center items-center'}>
          <h1 className={'text-4xl font-extrabold'}>{aiTool.name}</h1>
          <div className={'flex items-center justify-center pl-5'}>
            <p
              className={
                'p-1 px-3 bg-amber-500 rounded-xl font-semibold text-sm'
              }>
              {
                getAiToolCategoryFromCategory(
                  aiTool.category as AiToolCategoryEnum,
                ).name
              }
            </p>
          </div>
          <div className={'flex items-center justify-center pl-5'}>
            <p
              className={
                'p-1 px-3 bg-amber-500 rounded-xl font-semibold text-sm'
              }>
              {getAiPricing(aiTool.pricing as PricingEnum).name}
            </p>
          </div>
        </div>
        <div className={'flex w-full pt-10'}>
          <img
            src={aiTool.image}
            className={'mx-auto max-h-[650px]'}
            alt={'image tool'}
          />
        </div>
        <div className={'flex w-full justify-center py-4'}>
          <PrimaryButton
            title={'see the website'}
            loading={false}
            disabled={false}
            onClick={() => {
              window.open(aiTool.url, '_blank', 'noopener,noreferrer');
            }}
          />
        </div>
        <div className={'bg-gray-500 p-3 rounded-xl'}>
          <p className={'text-sm'}> {aiTool.description}</p>
        </div>
      </div>
    </div>
  );
}

export default AiToolItemDialogContent;
