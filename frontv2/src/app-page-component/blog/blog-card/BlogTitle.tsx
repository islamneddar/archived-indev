import React from 'react';
import {Blog} from '@/types/api/blog';

interface IBlogTitleProps {
  blog: Blog;
}

function BlogTitle(props : IBlogTitleProps) {
  return (
    <div>
      <p
        className="line-clamp-3 font-medium cursor-pointer"
        onClick={() => {
          console.log('blog', props.blog.title);
        }}>
        {props.blog.title}
      </p>
    </div>
  );
}

export default BlogTitle;