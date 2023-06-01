import React from 'react';
import {SourceBlog} from '@/types/api/source_blog';
import SourceBlogCard from '@/app-page-component/blog-section/source_blog/SourceBlogCard';

interface ISourceBlogListProps {
  sourceBlogs: SourceBlog[];
}

function SourceBlogList(props: ISourceBlogListProps) {
  return (
    <div className={'flex flex-wrap gap-3 justify-center items-center'}>
      {props.sourceBlogs.map((sourceBlog, index) => {
        return <SourceBlogCard key={index} sourceBlog={sourceBlog} />;
      })}
    </div>
  );
}

export default SourceBlogList;
