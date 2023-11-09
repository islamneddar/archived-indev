'use client';

import React from 'react';
import {usePathname} from 'next/navigation';
import AiToolsBody from '@/app-page-component/ai-tool-section/ai-tools/AIToolsBody';

function Page() {
  // get the pathname
  const pathname = usePathname();

  const partsPathname = pathname?.split('/');

  const category = partsPathname?.[partsPathname.length - 1];

  return (
    <div className={'w-full'}>
      <AiToolsBody category={category}></AiToolsBody>
    </div>
  );
}

export default Page;
