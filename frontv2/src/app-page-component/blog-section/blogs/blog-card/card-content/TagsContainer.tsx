'use client';
import React from 'react';
import {ScrollMenu} from 'react-horizontal-scrolling-menu';
import {Blog} from '@/infra/web-services/types/blogs/blog';
import 'react-horizontal-scrolling-menu/dist/styles.css';

export interface TagsContainerProps {
  blog: Blog;
}
function TagsContainer(props: TagsContainerProps) {
  return (
    //<div className={"flex flex-wrap overflow-x-auto cursor-grab "}>
    <ScrollMenu scrollContainerClassName={'scrollbar-hide'}>
      {props.blog.tags.slice(0, 3).map((tag, index) => (
        <span
          key={index}
          className="py-1 mx-1 my-1 flex rounded-xl text-10 whitespace-nowrap text-white
          bg-gray-900 px-2 font-medium">
          #{tag.title}
        </span>
      ))}
    </ScrollMenu>
  );
}

export default TagsContainer;
