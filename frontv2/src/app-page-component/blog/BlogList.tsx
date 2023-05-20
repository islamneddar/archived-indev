'use client';
import React, {useEffect, useState} from 'react';
import {Order, PaginationRequestMetaRequest} from '@/types/api/common';
import BlogCard from './blog-card/BlogCard';
import {TypeFeed} from '@/types/api/source_blog';
import {useDispatch} from 'react-redux';
import {getAllBlogThunk} from '@/redux/blog/blog.thunk';
import {useBlogSelector} from '@/redux/blog/blog.selector';
import InfiniteScroll from 'react-infinite-scroll-component';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {
  BlogAffichageType,
  GridBlogType,
} from '@/types/general/blog-general.type';
import {blogAffichageType, gridBlogType} from '@/types/data/blog-general.data';
import BlogsCardLists from '@/app-page-component/blog/BlogsCardLists';

export interface IBlogListProps {
  typeFeed: TypeFeed;
}

function BlogList(props: IBlogListProps) {
  const dispatchThunk = useDispatch<ThunkDispatch<any, any, any>>();
  const {loading, blogs, meta, success, error} = useBlogSelector();
  const [page, setPage] = useState<number>(1);
  const [restart, setRestart] = useState<boolean>(true);
  const [stateGrid, setStateGrid] = useState<GridBlogType>(GridBlogType.LIST);
  const [stateAffichage, setStateAffichage] = useState<BlogAffichageType>(
    BlogAffichageType.LATEST,
  );

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
    <div className={'md:px-5 lg:px-10 w-full'}>
      <div
        id={'scrollBlogId'}
        className={'overflow-y-auto h-[calc(100vh_-_136px)] sm:scrollbar-hide'}>
        {
          <div
            className={
              'w-full flex justify-center items-center py-5 text-center'
            }>
            <div
              className={'w-full flex justify-between border-b-1 border-white'}>
              <div>
                {blogAffichageType.map((grid, index) => {
                  return (
                    <div
                      key={index}
                      className={
                        `hover:bg-indigo-500 rounded-t-lg hover:cursor-pointer w-20` +
                        (stateAffichage === grid.value ? ' bg-indigo-500' : '')
                      }
                      onClick={() => setStateAffichage(grid.value)}>
                      <p className={'p-1 text-white font-medium px-2'}>
                        {grid.content}
                      </p>
                    </div>
                  );
                })}
              </div>
              <div className={'flex flex-row gap-3'}>
                {gridBlogType.map((grid, index) => {
                  return (
                    <div
                      key={index}
                      className={
                        `hover:bg-indigo-500 rounded-t-lg hover:cursor-pointer w-20` +
                        (stateGrid === grid.value ? ' bg-indigo-500' : '')
                      }
                      onClick={() => setStateGrid(grid.value)}>
                      <p className={'p-1 text-white font-medium px-2'}>
                        {grid.content}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
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
          <BlogsCardLists
            blogs={blogs}
            gridBlogType={stateGrid}></BlogsCardLists>
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default BlogList;
