import React from 'react';
import {GridBlogType} from '@/types/general/blog-general.type';
import BlogCard from '@/app-page-component/blog/blog-card/BlogCard';
import {Blog} from '@/types/api/blog';
import BlogCardList from '@/app-page-component/blog/blog-card/BlogCardList';

interface IBlogsCardListsProps {
  gridBlogType: GridBlogType;
  blogs: Blog[];
}

function BlogsCardLists(props: IBlogsCardListsProps) {
  if (props.gridBlogType === GridBlogType.GRID) {
    return (
      <div className={'flex flex-wrap gap-x-2.5 justify-center items-center'}>
        {props.blogs.map((blog, index) => {
          return <BlogCard key={index} blog={blog}></BlogCard>;
        })}
      </div>
    );
  }
  return (
    <div>
      <div className={'flex flex-col gap-x-2.5 justify-center items-start'}>
        {props.blogs.map((blog, index) => {
          return <BlogCardList key={index} blog={blog}></BlogCardList>;
        })}
      </div>
    </div>
  );
}

export default BlogsCardLists;
