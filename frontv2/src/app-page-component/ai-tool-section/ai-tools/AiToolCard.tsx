'use client';
import React from 'react';
import {AiTool} from '@/types/api/ai-tools/ai-tool';
import {ArrowTopRightOnSquareIcon} from '@heroicons/react/24/solid';
import {Tag} from 'primereact/tag';
import {useDispatch} from 'react-redux';
import {setAiTool} from '@/redux/slices/ai-tools/ai-tool/ai-tool-state/ai-tool-state.slice';
import {getAiPricing, PricingEnum} from '@/types/data/ai-tool/ai-tool-pricing';
import {BookmarkIcon} from '@heroicons/react/24/outline';
import {
  AiToolCategoryEnum,
  getAiToolCategoryFromCategory,
} from '@/types/data/ai-tool/ai-tool-category.data';

interface AiToolCardProps {
  aiTool: AiTool;
}
function AiToolCard(props: AiToolCardProps) {
  const dispatch = useDispatch();
  const aiTool = props.aiTool;
  return (
    <div className={'flex w-full items-center justify-center'}>
      <div
        className={
          'bg-gray-700 sm:h-340 rounded-xl shadow-xl float-left w-full max-w-300 sm:w-260 my-1 mx-1 break-inside-avoid cursor-pointer'
        }
        onClick={() => {
          dispatch(setAiTool(aiTool));
        }}>
        <div className={'flex flex-col h-full'}>
          <div>
            <img
              src={props.aiTool.image}
              alt={'image tool'}
              className={'object-cover rounded-t-xl h-161 w-full'}
            />
          </div>
          <div className={'px-2 flex flex-1 flex-col '}>
            <div className={'py-3 flex justify-between'}>
              <p className={'font-medium text-lg line-clamp-1'}>
                {aiTool.name}
              </p>
              <div className={'flex items-end'}>
                <Tag
                  style={
                    {
                      //backgroundColor: '#374151',
                    }
                  }>
                  {getAiPricing(aiTool.pricing as PricingEnum).name}
                </Tag>
              </div>
            </div>
            <div className={'flex flex-1'}>
              <p className={'line-clamp-2 text-sm h-40'}>
                {aiTool.description}
              </p>
            </div>
            <div className={'py-1'}>
              <Tag
                style={{
                  backgroundColor: '#374151',
                }}>
                <p
                  className={
                    'text-tn font-light border p-1 rounded-lg border-indigo-500'
                  }>
                  {
                    getAiToolCategoryFromCategory(
                      aiTool.category as AiToolCategoryEnum,
                    ).name
                  }
                </p>
              </Tag>
            </div>
            <div
              className={
                'flex w-full h-full pb-2 gap-2 justify-center items-center'
              }>
              <div
                className={'flex-1 h-full w-full justify-center items-center'}>
                <a
                  className={
                    'flex flex-1 justify-center items-center h-full w-full bg-indigo-500 rounded-lg'
                  }
                  href={aiTool.url}
                  target={'_blank'}
                  rel={'noreferrer'}
                  onClick={event => {
                    event.stopPropagation();
                  }}>
                  <ArrowTopRightOnSquareIcon className={'w-5 cursor-pointer'} />
                </a>
              </div>
              {/*<div
                className={'flex-1 h-full w-full justify-center items-center'}>
                <a
                  className={
                    'flex flex-1 justify-center items-center h-full w-full border border-indigo-500 rounded-lg'
                  }
                  href={aiTool.url}
                  target={'_blank'}
                  rel={'noreferrer'}
                  onClick={event => {
                    event.stopPropagation();
                  }}>
                  <BookmarkIcon className={'w-5 cursor-pointer'} />
                </a>
              </div>*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AiToolCard;
