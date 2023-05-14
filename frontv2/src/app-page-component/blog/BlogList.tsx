'use client';
import React, {useEffect, useState} from 'react';
import {Order, PaginationRequestMetaRequest} from '@/types/api/common';
import BlogCard from './blog-card/BlogCard';
import {TypeFeed} from '@/types/api/source_blog';
import {useDispatch} from 'react-redux';
import {getAllBlogThunk} from '@/redux/blog/blog.thunk';
import {useBlogSelector} from '@/redux/blog/blog.selector';
import {Masonry, useInfiniteLoader} from 'masonic';
import InfiniteScroll from 'react-infinite-scroll-component';

export interface IBlogListProps {
  typeFeed: TypeFeed;
}

function BlogList(props: IBlogListProps) {
  const dispatch = useDispatch();
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

  useEffect(()=>{
    if(success){
      console.log("set page + 1")
      setPage(page + 1);
    }
  }, [success])

  useEffect(() => {
    if(error !== undefined) {
      console.log(error);
      return;
    }
  }, [error])

  const fetchBlogs = async (restart: boolean) => {
      const paginationRequest: PaginationRequestMetaRequest = {
        page: page,
        take: 12,
        order: Order.DESC,
      };

      const getAllBlogRequest = {
        paginationRequestMeta: paginationRequest,
      }
      console.log(page)
      dispatch(getAllBlogThunk(getAllBlogRequest));
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
          loader={<div>Loading ...</div>}
          dataLength={blogs.length}
          scrollableTarget={'scrollBlogId'}
          scrollThreshold={0.8}>
        <Masonry items={blogs}
                 columnGutter={15}
          // Sets the minimum column width to 172px
                 columnWidth={172}
          // Pre-renders 5 windows worth of content
                 overscanBy={3}
                 columnCount={4}
                 render={BlogCard}
        />
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default BlogList;
