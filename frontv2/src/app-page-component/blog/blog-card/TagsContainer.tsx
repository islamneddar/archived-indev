import React from 'react';
import {ScrollMenu} from 'react-horizontal-scrolling-menu';
import {Blog} from '@/types/api/blog';

export interface TagsContainerProps {
  blog: Blog;
}
function TagsContainer(props : TagsContainerProps) {
  return (
    //<div className={"flex flex-wrap overflow-x-auto cursor-grab "}>
    <ScrollMenu scrollContainerClassName={'scrollbar-hide'}>
    {props.blog.tags.slice(0, 3).map((tag, index) => (
      <span
        key={index}
        className="py-1 px-1 mx-1 my-1 flex rounded-xl text-10 whitespace-nowrap text-gray-900 bg-gray-300 ">
                  {tag.title}
                </span>
    ))}
  </ScrollMenu>

  //</div>
  );
}

export default TagsContainer;