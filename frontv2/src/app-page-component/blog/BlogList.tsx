'use client';
import React, {useEffect, useState} from 'react';
import {Order, PaginationRequestMetaRequest} from '@/types/api/common';
import BlogCard from './blog-card/BlogCard';
import {TypeFeed} from '@/types/api/source_blog';
import {useDispatch} from 'react-redux';
import {getAllBlogThunk} from '@/redux/blog/blog.thunk';
import {useBlogSelector} from '@/redux/blog/blog.selector';
import InfiniteScroll from 'react-infinite-scroll-component';
import {AppDispatch} from '@/redux/store';
import {ThunkDispatch} from '@reduxjs/toolkit';

export interface IBlogListProps {
  typeFeed: TypeFeed;
}

function BlogList(props: IBlogListProps) {
  const dispatchThunk = useDispatch<ThunkDispatch<any, any, any>>();
  const {loading, blogs, meta, success, error} = useBlogSelector();
  const [page, setPage] = useState<number>(1);
  const [restart, setRestart] = useState<boolean>(true);

  useEffect(() => {
    async function getBlogs() {
      await fetchBlogs(restart);
    }

    if (restart) {
      getBlogs();
    }
  }, [restart]);

  useEffect(() => {
    setPage(1);
    setRestart(true);
  }, [props.typeFeed]);

  useEffect(() => {
    if (success) {
      setPage(page + 1);
    }
  }, [success]);

  useEffect(() => {
    if (error !== undefined) {
      console.log(error);
      return;
    }
  }, [error]);

  const fetchBlogs = async (restart: boolean) => {
    const paginationRequest: PaginationRequestMetaRequest = {
      page: page,
      take: 12,
      order: Order.DESC,
    };

    const getAllBlogRequest = {
      paginationRequestMeta: paginationRequest,
    };

    dispatchThunk(getAllBlogThunk(getAllBlogRequest));
    if (restart) {
      setRestart(false);
    }
  };

  return (
    <div className={'md:px-5 lg:px-20 w-full'}>
      <div
        id={'scrollBlogId'}
        className={'overflow-y-auto h-[calc(100vh_-_136px)] sm:scrollbar-hide'}>
        {
          <div
            className={
              'w-full flex justify-center items-center py-10 text-center'
            }>
            <h2 className={'text-3xl text-center'}>
              The latest Blogs in the Tech Industry for developers
            </h2>
          </div>
        }
        <InfiniteScroll
          next={() => fetchBlogs(false)}
          hasMore={meta.hasNextPage}
          loader={<div></div>}
          dataLength={blogs.length}
          scrollableTarget={'scrollBlogId'}
          scrollThreshold={0.8}
          className={'mx-auto w-full'}>
          <div
            className={'flex flex-wrap gap-x-2.5 justify-center items-center'}>
            {blogs.map((blog, index) => {
              return <BlogCard key={index} blog={blog}></BlogCard>;
            })}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default BlogList;
