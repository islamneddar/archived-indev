'use client';

import React from 'react';
import {Blog} from '@/types/api/blog';
import './BlogCard.css';
import 'react-tooltip/dist/react-tooltip.css';
import SourceAndTimeContainer from '@/app-page-component/blog-section/blogs/blog-card/card-content/SourceAndTimeContainer';
import BlogTitle from '@/app-page-component/blog-section/blogs/blog-card/card-content/BlogTitle';
import TagsContainer from '@/app-page-component/blog-section/blogs/blog-card/card-content/TagsContainer';
import ReactionGroupButtonCardBlog from '@/app-page-component/blog-section/blogs/blog-card/card-content/ReactionGroupButtonCard';
import {GridBlogType} from '@/types/general/blog-general.type';

export interface IBlogCardProps {
  blog: Blog;
  gridBlogType?: GridBlogType;
}

function BlogCard(props: IBlogCardProps) {
  const {blog: blog} = props;

  return (
    <div
      className="bg-gray-700 sm:h-300 rounded-xl shadow-xl float-left w-full max-w-300 sm:w-260 my-1 mx-1 break-inside-avoid"
      onClick={event => {
        event.stopPropagation();
        window.open(blog.permalink, '_blank', 'noopener,noreferrer');
      }}
      key={blog.blogId}>
      <div className={'pb-2 h-full flex flex-col'}>
        <div className={'px-5 cursor-pointer'}>
          <BlogTitle blog={blog}></BlogTitle>
        </div>
        <div className="flex flex-col h-full justify-between px-5">
          {blog.thumbnail && (
            <div className={'h-16 mt-3'}>
              <img
                src={blog.thumbnail}
                className={'w-full h-full rounded-xl object-cover'}
                alt={'img blog-section'}
              />
            </div>
          )}
          <SourceAndTimeContainer blog={blog}></SourceAndTimeContainer>
          <TagsContainer blog={blog}></TagsContainer>
        </div>
        <ReactionGroupButtonCardBlog
          classNameContainer={'mt-2 border-t-2 rounded-md pt-2 px-4'}
          blog={blog}></ReactionGroupButtonCardBlog>
      </div>
    </div>
  );
}

export default BlogCard;
