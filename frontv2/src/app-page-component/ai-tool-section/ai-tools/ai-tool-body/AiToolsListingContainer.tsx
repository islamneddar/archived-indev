import React from 'react';
import AiToolList from '@/app-page-component/ai-tool-section/ai-tools/ai-tool-body/listing/AiToolList';
import {AiTool} from '@/types/api/ai-tools/ai-tool';
import AiToolBodyFilter from '@/app-page-component/ai-tool-section/ai-tools/ai-tool-body/ai-tool-body-filter/AiToolBodyFilter';

interface AiToolsListingContainerProps {
  aiTools: AiTool[];
  isLoading: boolean;
  hasNextPage: boolean;
  onClickLoadMore: () => void;
}
function AiToolsListingContainer(props: AiToolsListingContainerProps) {
  return (
    <div className={'flex'}>
      <div className={'w-354 sticky top-10 bg-red self-start'}>
        <AiToolBodyFilter />
      </div>
      <div className={' flex-1'}>
        <AiToolList
          aiTools={props.aiTools}
          isLoading={props.isLoading}
          hasNextPage={props.hasNextPage}
          onClickLoadMore={props.onClickLoadMore}
        />
      </div>
    </div>
  );
}

export default AiToolsListingContainer;
