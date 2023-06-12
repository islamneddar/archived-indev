import React from 'react';
import {SourceBlog} from '@/types/api/source_blog';
import HeaderContentSideOverGetBlogsSourceBlog from '@/app-page-component/blog-section/source_blogs/slide-over-get-blogs/content/HeaderContentSideOverGetBlogsSourceBlog';
import {Divider} from 'primereact/divider';
import BlogList from '@/app-page-component/blog-section/blogs/BlogList';
import {GridBlogType} from '@/types/general/blog-general.type';
import useResponsive from '@/hooks/useResponsive';

interface IContentSideOverGetBlogsProps {
  sourceBlog: SourceBlog;
}

function ContentSideOverGetBlogs(props: IContentSideOverGetBlogsProps) {
  const sourceBlog = props.sourceBlog;
  const responsive = useResponsive();
  return (
    <div className={'w-full'}>
      <HeaderContentSideOverGetBlogsSourceBlog
        sourceBlog={sourceBlog}></HeaderContentSideOverGetBlogsSourceBlog>
      {<Divider />}
      {
        <div className={'pt-2'}>
          <div
            className={
              'overflow-y-auto h-[calc(100vh_-_223px)] scrollbar-hide'
            }>
            <BlogList
              showContainerOfGridAndFilter={false}
              gridToShow={
                responsive.isMobile ? GridBlogType.GRID : GridBlogType.LIST
              }
              showAd={false}
              ForSpecificSourceBlog={sourceBlog.sourceBlogId}
            />
          </div>
        </div>
      }
    </div>
  );
}

export default ContentSideOverGetBlogs;
