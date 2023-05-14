import React from 'react';
import {Tooltip as ReactTooltip} from 'react-tooltip';
import {Blog} from '@/types/api/blog';
import {timeSince} from '@/utils/time.util';

export interface SourceAndTimeContainerProps {
  blog: Blog;
}
function SourceAndTimeContainer(props : SourceAndTimeContainerProps) {
  const dateFormatV2 = timeSince(new Date(props.blog.publishDate).getTime());
  return (
    <div className="flex flex-row items-center">
      <div className="flex justify-start items-center">
        <img
          data-tip={props.blog.sourceBlog.name}
          data-for="source_blog_name"
          src={props.blog.sourceBlog.image}
          className={'w-7 h-7 rounded-xl '}
          alt={'img blog'}
          data-tooltip-id="my-source_blog_name"
          data-tooltip-content={props.blog.sourceBlog.name}
          data-tooltip-place="top"
        />
        <ReactTooltip
          id="source_blog_name"
          place="top"
        />
      </div>
      <div className="flex justify-start items-end pl-3">
        <p className="text-12">{dateFormatV2} ago</p>
      </div>
    </div>
  );
}

export default SourceAndTimeContainer;