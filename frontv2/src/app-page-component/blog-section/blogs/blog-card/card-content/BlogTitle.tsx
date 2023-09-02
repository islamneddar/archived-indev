'use client';
import React from 'react';
import {Blog} from '@/types/api/blogs/blog';

interface IBlogTitleProps {
  blog: Blog;
}

function BlogTitle(props: IBlogTitleProps) {
  return (
    <div className={'py-2 h-81'}>
      <p
        className="line-clamp-3 font-medium cursor-pointer text-18 text-gray-100 hover:text-gray-300"
        onClick={() => {
          //console.log('blog-section', props.blog-section.title);
        }}>
        {props.blog.title}
      </p>
    </div>
  );
}

export default BlogTitle;
