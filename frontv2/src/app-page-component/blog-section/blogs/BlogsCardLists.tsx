import React from 'react';
import {GridBlogType} from '@/infra/enums/blog-general.type';
import BlogCard from '@/app-page-component/blog-section/blogs/blog-card/BlogCard';
import {Blog} from '@/types/api/blogs/blog';
import BlogCardList from '@/app-page-component/blog-section/blogs/blog-card/BlogCardList';
import AdContainer from '@/app-page-component/ad-container/AdContainer';

interface IBlogsCardListsProps {
  gridBlogType: GridBlogType;
  blogs: Blog[];
  showAd?: boolean;
}

function BlogsCardLists(props: IBlogsCardListsProps) {
  if (props.gridBlogType === GridBlogType.GRID) {
    return (
      <div
        className={`flex flex-wrap gap-x-2.5 gap-y-2 justify-center items-center`}>
        {props.blogs.map((blog, index) => {
          return <BlogCard key={index} blog={blog}></BlogCard>;
        })}
      </div>
    );
  }

  return (
    <div className={'flex flex-row flex-4'}>
      <div
        className={`flex flex-col sm:gap-x-2.5 justify-center items-start ${
          props.showAd ? 'flex-3' : ''
        }`}>
        {props.blogs.map((blog, index) => {
          return (
            <BlogCardList
              key={index}
              blog={blog}
              gridBlogType={props.gridBlogType}></BlogCardList>
          );
        })}
      </div>
      {props.showAd && (
        <div className={'flex flex-1'}>
          <div className={'p-2'}>
            <AdContainer></AdContainer>
          </div>
        </div>
      )}
    </div>
  );
}

export default BlogsCardLists;
