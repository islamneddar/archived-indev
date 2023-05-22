'use client';
import React from 'react';
import BlogsBody from '@/app-page-component/blog/BlogsBody';
import {TypeFeed} from '@/types/api/source_blog';

interface IBlogBodyTypeProps {
  params: {
    type: string;
  };
}

function Page(props: IBlogBodyTypeProps) {
  return <BlogsBody type={props.params.type as TypeFeed}></BlogsBody>;
}

export default Page;
