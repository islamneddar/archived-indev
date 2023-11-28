import React from 'react';
import {SourceBlog} from '@/infra/web-services/types/blogs/source_blog';
import SourceBlogCard from '@/app-page-component/blog-section/source_blogs/source_blog/SourceBlogCard';

interface ISourceBlogListProps {
  sourceBlogs: SourceBlog[];
}

function SourceBlogList(props: ISourceBlogListProps) {
  return (
    <div
      className={
        'grid tn:grid-cols-1 md:grid-cols-2 gap-3 justify-center items-center w-full'
      }>
      {props.sourceBlogs.map((sourceBlog, index) => {
        return <SourceBlogCard key={index} sourceBlog={sourceBlog} />;
      })}
    </div>
  );
}

export default SourceBlogList;
