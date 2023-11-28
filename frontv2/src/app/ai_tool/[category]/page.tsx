'use client';

import React from 'react';
import AiToolsBody from '@/app-page-component/ai-tool-section/ai-tools/AIToolsBody';
import useGetCategoryFromPathName from '@/infra/hooks/ai-tool-section/useGetCategoryFromPathName';

function Page() {
  // get the pathname
  const category = useGetCategoryFromPathName();

  return (
    <div className={'w-full'}>
      <AiToolsBody category={category}></AiToolsBody>
    </div>
  );
}

export default Page;
