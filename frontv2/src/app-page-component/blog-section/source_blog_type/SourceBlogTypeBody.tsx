'use client';
import React from 'react';
import {typeFeed} from '@/types/data/blog-general.data';
import SourceBlogTypeItem from '@/app-page-component/blog-section/source_blog_type/SourceBlogTypeItem';

function SourceBlogTypeBody() {
  return (
    <div className={'overflow-y-auto h-[calc(100vh_-_136px)] w-full'}>
      <div className={'grid grid-cols-2 w-full gap-2'}>
        {typeFeed.map((sourceBlogType, index) => {
          return (
            <SourceBlogTypeItem
              key={index}
              sourceBlogType={sourceBlogType}></SourceBlogTypeItem>
          );
        })}
      </div>
    </div>
  );
}

export default SourceBlogTypeBody;
