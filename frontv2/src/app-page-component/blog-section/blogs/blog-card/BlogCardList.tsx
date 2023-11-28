import React from 'react';
import {Blog} from '@/infra/web-services/types/blogs/blog';
import BlogTitle from '@/app-page-component/blog-section/blogs/blog-card/card-content/BlogTitle';
import SourceAndTimeContainer from '@/app-page-component/blog-section/blogs/blog-card/card-content/SourceAndTimeContainer';
import TagsContainer from '@/app-page-component/blog-section/blogs/blog-card/card-content/TagsContainer';
import ReactionGroupButtonCardBlog from '@/app-page-component/blog-section/blogs/blog-card/card-content/ReactionGroupButtonCard';
import {GridBlogType} from '@/infra/enums/blog-general.type';

interface IBlogCardListProps {
  blog: Blog;
  gridBlogType: GridBlogType;
}

function BlogCardList(props: IBlogCardListProps) {
  const blog = props.blog;

  return (
    <div className={'flex w-full'}>
      <div
        className="flex flex-3 bg-gray-700 rounded-xl cursor-pointer shadow-xl float-left my-1 mx-1 break-inside-avoid w-full h-180"
        onClick={event => {
          event.stopPropagation();
          window.open(blog.permalink, '_blank', 'noopener,noreferrer');
        }}
        key={blog.blogId}>
        <div className={'flex w-full flex-4'}>
          <div className={'flex flex-3 flex-col'}>
            <div className={'px-5'}>
              <BlogTitle blog={blog}></BlogTitle>
            </div>
            <div className="flex flex-col flex-1 h-full justify-between py-3 px-5">
              <SourceAndTimeContainer blog={blog}></SourceAndTimeContainer>
              <TagsContainer blog={blog}></TagsContainer>
            </div>
          </div>
          <div className={'flex flex-1'}>
            {blog.thumbnail && (
              <div className={'h-full w-full p-2'}>
                <img
                  src={blog.thumbnail}
                  className={'w-full h-full rounded-xl object-cover'}
                  alt={'img blog-section'}
                />
              </div>
            )}
          </div>
          <ReactionGroupButtonCardBlog
            classNameContainer={' border-l-2 rounded-md pt-2 px-2'}
            blog={blog}
            gridBlogType={props.gridBlogType}></ReactionGroupButtonCardBlog>
        </div>
      </div>
    </div>
  );
}

export default BlogCardList;
