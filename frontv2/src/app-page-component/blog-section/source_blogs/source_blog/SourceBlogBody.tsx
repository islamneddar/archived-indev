'use client';
import React, {useEffect, useState} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {useSourceBlogSelector} from '@/redux/slices/blogs/source_blog/api/get-all-source-blog/soure-blog.selector';
import {
  Order,
  PageMetaResponse,
  PaginationRequestMetaRequest,
} from '@/types/api/common';
import {useDispatch} from 'react-redux';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {getAllSourceBlogThunk} from '@/redux/slices/blogs/source_blog/api/get-all-source-blog/source-blog.thunk';
import SourceBlogList from '@/app-page-component/blog-section/source_blogs/source_blog/SourceBlogList';
import {useUserSessionSelector} from '@/redux/slices/auth/user/user.selector';
import {
  GetAllSourceBlogRequest,
  SourceBlog,
  TypeFeed,
} from '@/types/api/blogs/source_blog';
import {resetSourceBlogState} from '@/redux/slices/blogs/source_blog/api/get-all-source-blog/source-blog.slice';
import {useFollowSourceBlogSelector} from '@/redux/slices/blogs/source_blog/api/follow-source-blog/follow-source-blog.selector';
import {resetFollowSourceBlogState} from '@/redux/slices/blogs/source_blog/api/follow-source-blog/follow-source-blog.slice';
import toast from 'react-hot-toast';
import SideOverGetBlogs from '@/app-page-component/blog-section/source_blogs/slide-over-get-blogs/SideOverGetBlogs';
import {useSystemSelector} from '@/redux/slices/system/system.selector';

export interface SourceBlogBodyProps {
  typeSourceBlog: string;
}

function SourceBlogBody(props: SourceBlogBodyProps) {
  const [sourceBlogs, setSourceBlogs] = useState<SourceBlog[]>([]);
  const [metaData, setMetaData] = useState<PageMetaResponse>({
    page: 1,
    hasPreviousPage: false,
    hasNextPage: false,
  });
  const [page, setPage] = useState<number>(1);
  const dispatch = useDispatch();
  const dispatchThunk = useDispatch<ThunkDispatch<any, any, any>>();

  const userSession = useUserSessionSelector();
  const sourceBlogSelector = useSourceBlogSelector();
  const followSourceBlogSelector = useFollowSourceBlogSelector();
  const systemSelector = useSystemSelector();
  const fetchSourceBlogs = async () => {
    const paginationRequest: PaginationRequestMetaRequest = {
      page: page,
      take: 50,
      order: Order.DESC,
    };

    const getAllSourceBlogByType: GetAllSourceBlogRequest = {
      paginationRequestMeta: paginationRequest,
      sourceBlogType: props.typeSourceBlog as TypeFeed,
      accessToken: userSession.user.accessToken,
    };

    dispatchThunk(getAllSourceBlogThunk(getAllSourceBlogByType));
  };

  useEffect(() => {
    async function getSourceBlogs() {
      await fetchSourceBlogs();
    }
    if (page === 1) {
      getSourceBlogs();
    }
  }, []);

  useEffect(() => {
    if (sourceBlogSelector.success) {
      if (sourceBlogSelector.data) {
        const sourceBlogsToAdd = [
          ...sourceBlogs,
          ...sourceBlogSelector.data.data,
        ];
        setSourceBlogs(sourceBlogsToAdd);
        setMetaData(sourceBlogSelector.data.meta);
        setPage(page + 1);
        dispatch(resetSourceBlogState());
      }
    }
  }, [sourceBlogSelector.success]);

  useEffect(() => {
    if (sourceBlogSelector.error !== undefined) {
      return;
    }
  }, [sourceBlogSelector.error]);

  useEffect(() => {
    if (page === 1) {
      //dispatch(clearSourceBlogs());
    }
  }, [page]);

  useEffect(() => {
    if (followSourceBlogSelector.success) {
      if (followSourceBlogSelector.data) {
        const followSourceBlog = followSourceBlogSelector.data;
        const sourceBlogUpdated = [...sourceBlogs].map(sourceBlog => {
          if (sourceBlog.sourceBlogId === followSourceBlog.sourceBlogId) {
            sourceBlog = {
              ...sourceBlog,
              isFollow: followSourceBlog.isFollow,
              numberFollowers: followSourceBlog.isFollow
                ? sourceBlog.numberFollowers + 1
                : sourceBlog.numberFollowers - 1,
            };
          }
          return sourceBlog;
        });
        setSourceBlogs([...sourceBlogUpdated]);
        dispatch(resetFollowSourceBlogState());
      }
    }

    if (followSourceBlogSelector.error) {
      toast.error('Something went wrong, please try again later');
    }
  }, [followSourceBlogSelector.success, followSourceBlogSelector.error]);

  return (
    <div className={'flex w-full pt-4'}>
      {systemSelector.sideOverForGetBlogsBySourceBlog ? (
        <SideOverGetBlogs></SideOverGetBlogs>
      ) : null}
      <InfiniteScroll
        next={() => fetchSourceBlogs()}
        hasMore={metaData.hasNextPage}
        loader={<div></div>}
        dataLength={sourceBlogs.length}
        scrollableTarget={'scrollSourceBlogId'}
        scrollThreshold={0.8}
        className={'mx-auto w-full'}>
        <SourceBlogList sourceBlogs={sourceBlogs}></SourceBlogList>
      </InfiniteScroll>
    </div>
  );
}

export default SourceBlogBody;
