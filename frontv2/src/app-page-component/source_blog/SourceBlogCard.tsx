'use client';
import React from 'react';
import {SourceBlog} from '@/types/api/source_blog';

interface ISourceBlogCardProps {
  sourceBlog: SourceBlog;
}
function SourceBlogCard(props: ISourceBlogCardProps) {
  const sourceBlog = props.sourceBlog;
  return (
    <div>
      <div>
        <div>
          <div></div>
          <div>
            <p>{sourceBlog.name}</p>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default SourceBlogCard;
