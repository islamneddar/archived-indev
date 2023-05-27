'use client';
import React, {useEffect, useState} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {useSourceBlogSelector} from '@/redux/source_blog/soure-blog.selector';
import {
  Order,
  PageMetaResponse,
  PaginationRequestMetaRequest,
} from '@/types/api/common';
import {useDispatch} from 'react-redux';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {getAllSourceBlogThunk} from '@/redux/source_blog/source-blog.thunk';
import SourceBlogList from '@/app-page-component/source_blog/SourceBlogList';
import {useUserSessionSelector} from '@/redux/auth/user/user.selector';
import {SourceBlog} from '@/types/api/source_blog';
import {resetSourceBlogState} from '@/redux/source_blog/source-blog.slice';
import {useFollowSourceBlogSelector} from '@/redux/source_blog/follow-source-blog/follow-source-blog.selector';
import {resetFollowSourceBlogState} from '@/redux/source_blog/follow-source-blog/follow-source-blog.slice';
import {Simulate} from 'react-dom/test-utils';
import toast from 'react-hot-toast';

function SourceBlogBody() {
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

  const fetchSourceBlogs = async () => {
    const paginationRequest: PaginationRequestMetaRequest = {
      page: page,
      take: 50,
      order: Order.DESC,
    };

    const getAllBlogRequest = {
      paginationRequestMeta: paginationRequest,
      accessToken: userSession.user.accessToken,
    };

    dispatchThunk(getAllSourceBlogThunk(getAllBlogRequest));
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
    <div>
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
