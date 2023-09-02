import React from 'react';
import {AiTool} from '@/types/api/ai-tools/ai-tool';
import Image from 'next/image';
import {ArrowTopRightOnSquareIcon} from '@heroicons/react/24/solid';
import {Tag} from 'primereact/tag';

interface AiToolCardProps {
  aiTool: AiTool;
}
function AiToolCard(props: AiToolCardProps) {
  const aiTool = props.aiTool;
  return (
    <div
      className={
        'bg-gray-700 sm:h-300 rounded-xl shadow-xl float-left w-full max-w-300 sm:w-260 my-1 mx-1 break-inside-avoid'
      }>
      <div className={'flex flex-col h-full'}>
        <div>
          <img
            src={props.aiTool.image}
            alt={'image tool'}
            className={'object-cover rounded-t-xl h-38 w-full'}
          />
        </div>
        <div className={'px-2 flex flex-1 flex-col justify-around'}>
          <div className={'py-1 flex justify-between'}>
            <p className={'font-medium text-xl line-clamp-1'}>{aiTool.name}</p>
            <ArrowTopRightOnSquareIcon
              className={'w-6 cursor-pointer'}></ArrowTopRightOnSquareIcon>
          </div>
          <div>
            <Tag>{aiTool.pricing}</Tag>
          </div>
          <div>
            <Tag>{aiTool.category}</Tag>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AiToolCard;
