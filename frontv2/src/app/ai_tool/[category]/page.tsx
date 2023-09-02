'use client';

import React from 'react';
import {usePathname, useRouter} from 'next/navigation';
import BookmarkBlogList from '@/app-page-component/blog-section/bookmarks/BookmarkBlogList';
import AiToolsBody from '@/app-page-component/ai-tool-section/ai-tools/AIToolsBody';

function Page() {
  // get the pathname
  const pathname = usePathname();

  const partsPathname = pathname?.split('/');

  const category = partsPathname?.[partsPathname.length - 1];

  // state

  // effects

  return (
    <div
      className={
        'overflow-y-auto h-[calc(100vh_-_136px)] w-full scrollbar-hide'
      }>
      <AiToolsBody category={category}></AiToolsBody>
    </div>
  );
}

export default Page;
