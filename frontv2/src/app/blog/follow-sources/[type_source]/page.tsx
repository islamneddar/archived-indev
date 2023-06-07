'use client';
import React from 'react';
import {ArrowLeftIcon} from '@heroicons/react/24/solid';
import {useRouter} from 'next/navigation';
import SourceBlogBody from '@/app-page-component/blog-section/source_blog/SourceBlogBody';
function Page({params}: {params: {type_source: string}}) {
  const router = useRouter();
  return (
    <div className={'overflow-y-auto h-[calc(100vh_-_136px)] w-full'}>
      <div className={'h-5 w-full flex'}>
        <ArrowLeftIcon
          className="h-5 w-5 text-white cursor-pointer"
          onClick={() => {
            router.back();
          }}
        />
      </div>
      <div className={'overflow-y-auto h-[calc(100vh_-_156px)] w-full'}>
        <SourceBlogBody typeSourceBlog={params.type_source}></SourceBlogBody>
      </div>
    </div>
  );
}

export default Page;
