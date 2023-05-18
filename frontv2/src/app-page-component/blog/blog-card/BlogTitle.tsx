import React from 'react';
import {Blog} from '@/types/api/blog';

interface IBlogTitleProps {
  blog: Blog;
}

function BlogTitle(props : IBlogTitleProps) {
  return (
    <div className={"py-2"}>
      <p
        className="line-clamp-3 font-medium cursor-pointer text-18 text-gray-100 hover:text-gray-300"
        onClick={() => {
          console.log('blog', props.blog.title);
        }}>
        {props.blog.title}
      </p>
    </div>
  );
}

export default BlogTitle;