'use client';
import React from 'react';
import {AiTool} from '@/types/api/ai-tools/ai-tool';
import {ArrowTopRightOnSquareIcon} from '@heroicons/react/24/solid';
import {Tag} from 'primereact/tag';
import {useDispatch} from 'react-redux';
import {setAiTool} from '@/redux/slices/ai-tools/ai-tool/ai-tool-state/ai-tool-state.slice';
import {getAiPricing, PricingEnum} from '@/types/data/ai-tool/ai-tool-pricing';
import {BookmarkIcon} from '@heroicons/react/24/outline';

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
              className={'object-cover rounded-t-xl h-38 w-full'}
            />
          </div>
          <div className={'px-2 flex flex-1 flex-col '}>
            <div className={'py-3 flex justify-between'}>
              <p className={'font-medium text-lg line-clamp-1'}>
                {aiTool.name}
              </p>
              <div className={'flex items-end'}>
                <Tag>
                  <p className={'text-tn font-light'}>{aiTool.category}</p>
                </Tag>
              </div>
            </div>
            <div className={'h-40'}>
              <p className={'line-clamp-2 text-sm'}>
                {aiTool.description} fsdfsdf sdf sdfsdf sdf sdfsdfds fsdf
                fdsfnksd f sdfk sdkf sjkdf sjkd fskjdf skjdf kdsjfskfsdkfsdjf
                sdkf sdjkf skjdf skjdf jksf j
              </p>
            </div>
            <div className={'py-2'}>
              <Tag
                style={{
                  backgroundColor: '#374151',
                }}>
                {getAiPricing(aiTool.pricing as PricingEnum).name}
              </Tag>
            </div>
            <div
              className={
                'flex w-full h-full pb-2 gap-2 justify-center items-center'
              }>
              <div
                className={'flex-1 h-full w-full justify-center items-center'}>
                <button
                  className={
                    'flex flex-1 justify-center items-center h-full w-full bg-indigo-500 rounded-lg'
                  }>
                  <ArrowTopRightOnSquareIcon
                    className={'w-5 cursor-pointer'}
                    onClick={event => {
                      event.stopPropagation();
                      window.open(aiTool.url, '_blank', 'noopener,noreferrer');
                    }}
                  />
                </button>
              </div>
              <div
                className={'flex-1 h-full w-full justify-center items-center'}>
                <button
                  className={
                    'flex flex-1 justify-center items-center h-full w-full border border-indigo-500 rounded-lg'
                  }>
                  <BookmarkIcon
                    className={'w-5 cursor-pointer'}
                    onClick={event => {
                      event.stopPropagation();
                      window.open(aiTool.url, '_blank', 'noopener,noreferrer');
                    }}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AiToolCard;
