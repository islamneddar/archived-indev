'use client';
import React, {useEffect, useState} from 'react';
import {Order, PageMeta, PaginationRequestMeta} from '../../types/api/common';
import {Blog, GetBlogsResponse} from '../../types/api/blog';
import BlogCard from './blog-card/BlogCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import {TypeFeed} from '../../types/api/source_blog';
import {AxiosError} from 'axios';
import toast from 'react-hot-toast';
import BlogService from '../../services/blog.service';

export interface IBlogListProps {
  typeFeed: TypeFeed;
}

function BlogList(props: IBlogListProps) {
  const [page, setPage] = useState<number>(1);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [restart, setRestart] = useState<boolean>(true);

  const [metaPageBlog, setMetaPageBlog] = useState<PageMeta>({
    page: 1,
    take: 4,
    hasNextPage: true,
    hasPreviousPage: false,
    pageCount: 1,
    itemCount: 0,
  });

  useEffect(() => {
    async function getBlogs() {
      await fetchBlogs(restart);
    }

    if (restart) {
      getBlogs();
    }
  }, [restart]);

  useEffect(() => {
    setBlogs([]);
    setPage(1);
    setRestart(true);
  }, [props.typeFeed]);

  const fetchBlogs = async (restart: boolean) => {
    try {
      const paginationRequest: PaginationRequestMeta = {
        page: page,
        take: 12,
        order: Order.DESC,
      };
      const res =
        await BlogService.getInstance().getAllBlogWithPaginationAndTypeFeed(
          paginationRequest,
          props.typeFeed,
        );
      const blogsFetched = res.data as GetBlogsResponse;
      const currentBlogs = [...blogs];
      currentBlogs.push(...blogsFetched.data);
      setBlogs(currentBlogs);
      setMetaPageBlog(blogsFetched.meta);
      setPage(page + 1);
      if (restart) {
        setRestart(false);
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err.response?.status);
        if (err.response?.status === 429) {
          toast.error('too many request');
          setMetaPageBlog({
            ...metaPageBlog,
            hasNextPage: false,
          });
        }
      }
    }
  };

  return (
    <div className={'md:px-5 lg:px-20 pt-5 w-full'}>
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
          hasMore={metaPageBlog?.hasNextPage}
          loader={<div>Loading ...</div>}
          dataLength={blogs.length}
          scrollableTarget={'scrollBlogId'}
          scrollThreshold={0.8}>
          <div
            className={
              'grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4'
            }>
            {blogs.map(blog => {
              return (
                <div key={blog.blogId}>
                  <BlogCard blog={blog} />
                </div>
              );
            })}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default BlogList;
