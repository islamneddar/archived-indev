'use client';

import React from 'react';
import {Blog} from '@/types/api/blog';
import './BlogCard.css';
import 'react-tooltip/dist/react-tooltip.css'
import SourceAndTimeContainer from '@/app-page-component/blog/blog-card/SourceAndTimeContainer';
import BlogTitle from '@/app-page-component/blog/blog-card/BlogTitle';
import TagsContainer from '@/app-page-component/blog/blog-card/TagsContainer';

export interface IBlogCardProps {
  blog: Blog;
}

function BlogCard(props: IBlogCardProps) {
  const {blog} = props;


  return (
    <div
      className="h-80 bg-gray-700 rounded-xl cursor-pointer shadow-xl"
      onClick={event => {
        event.stopPropagation();
        window.open(blog.permalink, '_blank', 'noopener,noreferrer');
      }}
      key={blog.blogId}>
      <div className={'pb-2 h-full flex flex-col'}>

        {
          blog.thumbnail && <div className={'h-40'}>
          <img
            src={blog.thumbnail}
            className={'w-full h-full rounded-xl object-fit'}
            alt={'img blog'}
          />
        </div>}
        <div className="flex flex-col flex-1 h-full justify-between pt-3 px-5">
          <SourceAndTimeContainer blog={blog}></SourceAndTimeContainer>
          <BlogTitle blog={blog}></BlogTitle>
          <TagsContainer blog={blog}></TagsContainer>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
