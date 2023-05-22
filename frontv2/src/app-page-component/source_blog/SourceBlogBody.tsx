'use client';
import React, {useEffect, useState} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {useSourceBlogSelector} from '@/redux/source_blog/soure_blog.selector';
import {Order, PaginationRequestMetaRequest} from '@/types/api/common';
import {useDispatch} from 'react-redux';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {getAllSourceBlogThunk} from '@/redux/source_blog/source_blog.thunk';
import SourceBlogList from '@/app-page-component/source_blog/SourceBlogList';
import {useUserSessionSelector} from '@/redux/auth/user/user.selector';
import {dispatch} from 'react-hot-toast/src/core/store';
import {clearSourceBlogs} from '@/redux/source_blog/source_blog.slice';

function SourceBlogBody() {
  const {loading, sourceBlogs, meta, success, error} = useSourceBlogSelector();
  const [page, setPage] = useState<number>(1);
  const dispatchThunk = useDispatch<ThunkDispatch<any, any, any>>();
  const dispatch = useDispatch();
  const userSession = useUserSessionSelector();

  const fetchSourceBlogs = async () => {
    const paginationRequest: PaginationRequestMetaRequest = {
      page: page,
      take: 12,
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

    getSourceBlogs();
  }, []);

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

  useEffect(() => {
    console.log('page source: ', page);
    if (page === 1) {
      //dispatch(clearSourceBlogs());
    }
  }, [page]);

  return (
    <div>
      <InfiniteScroll
        next={() => fetchSourceBlogs()}
        hasMore={meta.hasNextPage}
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
