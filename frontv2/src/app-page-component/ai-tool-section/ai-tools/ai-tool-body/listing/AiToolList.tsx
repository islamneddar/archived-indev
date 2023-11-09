import React from 'react';
import AiToolCard from '@/app-page-component/ai-tool-section/ai-tools/ai-tool-body/listing/AiToolCard';
import {ProgressSpinner} from 'primereact/progressspinner';
import {AiTool} from '@/types/api/ai-tools/ai-tool';
import PrimaryButton from '@/components/button/PrimaryButton';

interface AiToolListProps {
  aiTools: AiTool[];
  isLoading: boolean;
  hasNextPage: boolean;
  onClickLoadMore: () => void;
}
function AiToolList(props: AiToolListProps) {
  const isLoading = props.isLoading;

  return (
    <>
      <div
        className={
          'grid tn:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center'
        }>
        {props.aiTools.map((aiTool, index) => {
          return (
            <AiToolCard key={aiTool.aiToolId} aiTool={aiTool}></AiToolCard>
          );
        })}
      </div>
      {props.isLoading && (
        <div className={'flex pt-5'}>
          <ProgressSpinner></ProgressSpinner>
        </div>
      )}
      {props.hasNextPage && !props.isLoading && (
        <div className={'flex justify-center mt-3'}>
          <PrimaryButton
            buttonClassName={
              'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            }
            title={'Load more'}
            loading={isLoading}
            disabled={isLoading}
            onClick={() => {
              /*setState(prevState => ({
                ...prevState,
                page: prevState.page + 1,
                enabledQuery: true,
              }));*/
              props.onClickLoadMore();
            }}></PrimaryButton>
        </div>
      )}
    </>
  );
}

export default AiToolList;
