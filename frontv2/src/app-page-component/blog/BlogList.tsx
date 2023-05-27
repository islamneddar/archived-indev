'use client';
import React, {useEffect, useState} from 'react';
import {
  Order,
  PageMetaResponse,
  PaginationRequestMetaRequest,
} from '@/types/api/common';
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
import {Blog} from '@/types/api/blog';
import {useLikeBlogSelector} from '@/redux/blog/like-blog/like-blog.selector';
import {resetBlogState} from '@/redux/blog/blog.slice';
import {resetLikeBlogState} from '@/redux/blog/like-blog/like-blog.slice';
import toast from 'react-hot-toast';
import {useUserSessionSelector} from '@/redux/auth/user/user.selector';

export interface IBlogListProps {
  typeFeed: TypeFeed;
}

function BlogList(props: IBlogListProps) {
  const dispatchThunk = useDispatch<ThunkDispatch<any, any, any>>();
  const dispatch = useDispatch();

  const userSessionSelector = useUserSessionSelector();

  const blogSelector = useBlogSelector();
  const likeBlogSelector = useLikeBlogSelector();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [metaData, setMetaData] = useState<PageMetaResponse>({
    page: 1,
    hasPreviousPage: false,
    hasNextPage: false,
  });
  const [page, setPage] = useState<number>(1);
  const [restart, setRestart] = useState<boolean>(true);
  const [stateGrid, setStateGrid] = useState<GridBlogType>(GridBlogType.GRID);
  const [stateAffichage, setStateAffichage] = useState<BlogAffichageType>(
    BlogAffichageType.LATEST,
  );

  const fetchBlogs = async (restart: boolean) => {
    const paginationRequest: PaginationRequestMetaRequest = {
      page: page,
      take: 12,
      order: Order.DESC,
    };

    const getAllBlogRequest = {
      paginationRequestMeta: paginationRequest,
      accessToken:
        userSessionSelector.isAuthenticated &&
        userSessionSelector.user.accessToken
          ? userSessionSelector.user.accessToken
          : null,
    };

    dispatchThunk(getAllBlogThunk(getAllBlogRequest));
    if (restart) {
      setRestart(false);
    }
  };

  useEffect(() => {
    async function getBlogs() {
      await fetchBlogs(restart);
    }

    if (restart && page === 1) {
      getBlogs();
    }
  }, [restart]);

  useEffect(() => {
    if (blogSelector.success) {
      if (blogSelector.data) {
        setBlogs([...blogs, ...blogSelector.data.data]);
        setMetaData(blogSelector.data.meta);
        setPage(page + 1);
        dispatch(resetBlogState());
      }
    }

    if (blogSelector.error !== undefined) {
      console.log(blogSelector.error);
      return;
    }
  }, [blogSelector.success, blogSelector.error]);

  useEffect(() => {
    if (likeBlogSelector.success) {
      if (likeBlogSelector.data) {
        const blogResult = likeBlogSelector.data;
        const blogsUpdated = blogs.map(blog => {
          if (blog.blogId === blogResult.blogId) {
            blog = {
              ...blog,
              isLiked: blogResult.isLiked,
            };
          }
          return blog;
        });
        setBlogs(blogsUpdated);
        dispatch(resetLikeBlogState());
      }
    }

    if (likeBlogSelector.error) {
      toast.error('Something went wrong');
    }
  }, [likeBlogSelector.success, likeBlogSelector.error]);
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
          hasMore={metaData.hasNextPage}
          loader={<div></div>}
          dataLength={blogs.length}
          scrollableTarget={'scrollBlogId'}
          scrollThreshold={0.8}
          className={'mx-auto w-full overflow-hidden'}
          style={{overflow: 'hidden'}}>
          <BlogsCardLists
            blogs={blogs}
            gridBlogType={stateGrid}></BlogsCardLists>
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default BlogList;
