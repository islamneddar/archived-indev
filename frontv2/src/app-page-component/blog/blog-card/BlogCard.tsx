'use client';

import React from 'react';
import {Blog} from '@/types/api/blog';
import './BlogCard.css';
import 'react-tooltip/dist/react-tooltip.css'
import SourceAndTimeContainer from '@/app-page-component/blog/blog-card/SourceAndTimeContainer';
import BlogTitle from '@/app-page-component/blog/blog-card/BlogTitle';
import TagsContainer from '@/app-page-component/blog/blog-card/TagsContainer';
import {RenderComponentProps} from 'masonic';

export interface IBlogCardProps {
  blog: Blog;
}

function BlogCard(props: IBlogCardProps) {
  const {blog : blog} = props;


  return (
    <div
      className="bg-gray-700 rounded-xl cursor-pointer shadow-xl float-left w-300 my-1 mx-1 h-auto break-inside-avoid"
      onClick={event => {
        event.stopPropagation();
        window.open(blog.permalink, '_blank', 'noopener,noreferrer');
      }}
      key={blog.blogId}>
      <div className={'pb-2 h-full flex flex-col'}>
        <div className={"px-5"}>
          <BlogTitle blog={blog}></BlogTitle>
        </div>
        <div className="flex flex-col flex-1 h-full justify-between py-3 px-5">
          {
            blog.thumbnail && <div className={'h-16'}>
              <img
                src={blog.thumbnail}
                className={'w-full h-full rounded-xl object-cover'}
                alt={'img blog'}
              />
            </div>}
          <SourceAndTimeContainer blog={blog}></SourceAndTimeContainer>

          <TagsContainer blog={blog}></TagsContainer>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
