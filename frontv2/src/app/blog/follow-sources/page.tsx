'use client';
import React from 'react';
import SourceBlogBody from '@/app-page-component/blog-section/source_blogs/source_blog/SourceBlogBody';

function Page() {
  return (
    <div className={'overflow-y-auto h-[calc(100vh_-_136px)] w-full'}>
      <SourceBlogBody typeSourceBlog={'ai'}></SourceBlogBody>
    </div>
  );
}

export default Page;
