import React from 'react';
import {SourceBlog} from '@/types/api/source_blog';
import SourceBlogCard from '@/app-page-component/source_blog/SourceBlogCard';

interface ISourceBlogListProps {
  sourceBlogs: SourceBlog[];
}

function SourceBlogList(props: ISourceBlogListProps) {
  return (
    <div>
      {props.sourceBlogs.map((sourceBlog, index) => {
        return <SourceBlogCard key={index} sourceBlog={sourceBlog} />;
      })}
    </div>
  );
}

export default SourceBlogList;
