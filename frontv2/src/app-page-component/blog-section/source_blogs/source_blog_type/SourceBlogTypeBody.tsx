'use client';
import React, {useEffect} from 'react';
import SourceBlogTypeItem from '@/app-page-component/blog-section/source_blogs/source_blog_type/SourceBlogTypeItem';
import {useGetAllSourceBlogTypesSelector} from '@/redux/slices/blogs/source_blog/api/get-all-source-blog-types/get-all-source-blog-types.selector';
import {
  GetAllTypeSourceBlogRequest,
  SourceBlogTypeItemType,
} from '@/types/api/blogs/source_blog';
import {useUserSessionSelector} from '@/redux/slices/auth/user/user.selector';
import {getAllSourceBlogTypesThunk} from '@/redux/slices/blogs/source_blog/api/get-all-source-blog-types/get-all-source-blog-types.thunk';
import toast from 'react-hot-toast';
import {resetGetAllSourceBlogTypes} from '@/redux/slices/blogs/source_blog/api/get-all-source-blog-types/get-all-source-blog-types.slice';
import {useDispatch} from 'react-redux';
import {ThunkDispatch} from '@reduxjs/toolkit';

function SourceBlogTypeBody() {
  const dispatch = useDispatch();
  const dispatchThunk = useDispatch<ThunkDispatch<any, any, any>>();

  const [sourceBlogTypes, setSourceBlogTypes] = React.useState<
    SourceBlogTypeItemType[]
  >([]);

  const getAllSourceBlogTypesSelector = useGetAllSourceBlogTypesSelector();
  const userSelector = useUserSessionSelector();

  useEffect(() => {
    async function fetchDate() {
      fetchGetAllSourceBlogTypes();
    }

    fetchDate();
  }, []);

  useEffect(() => {
    if (getAllSourceBlogTypesSelector.data) {
      if (
        getAllSourceBlogTypesSelector.data &&
        getAllSourceBlogTypesSelector.data.data.length > 0
      ) {
        setSourceBlogTypes(getAllSourceBlogTypesSelector.data.data);
      }
    }

    if (getAllSourceBlogTypesSelector.error) {
      toast.error('Error when fetching source blog types, try later');
      dispatch(resetGetAllSourceBlogTypes());
    }
  }, [
    getAllSourceBlogTypesSelector.success,
    getAllSourceBlogTypesSelector.error,
  ]);

  const fetchGetAllSourceBlogTypes = async () => {
    const request: GetAllTypeSourceBlogRequest = {
      accessToken: userSelector.user.accessToken,
    };

    dispatchThunk(getAllSourceBlogTypesThunk(request));
  };

  if (getAllSourceBlogTypesSelector.loading) {
    return (
      <div
        className={
          'flex justify-center items-center h-[calc(100vh_-_136px)] w-full'
        }>
        <div className={'text-center'}>
          <div className={'text-2xl font-bold'}>Loading</div>
          <div className={'text-lg font-medium'}>
            Wait until the feeds type is loaded
          </div>
        </div>
      </div>
    );
  }

  if (sourceBlogTypes.length === 0) {
    return (
      <div
        className={
          'flex justify-center items-center h-[calc(100vh_-_136px)] w-full'
        }>
        <div className={'text-center'}>
          <div className={'text-2xl font-bold'}>No Source Blog Type</div>
          <div className={'text-lg font-medium'}>
            Wait until the feeds type is loaded
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={'overflow-y-auto h-[calc(100vh_-_136px)] w-full'}>
      <div className={'grid tn:grid-cols-1 sm:grid-cols-2 w-full gap-2'}>
        {sourceBlogTypes.map((sourceBlogType, index) => {
          return (
            <SourceBlogTypeItem
              key={index}
              sourceBlogType={sourceBlogType}></SourceBlogTypeItem>
          );
        })}
      </div>
    </div>
  );
}

export default SourceBlogTypeBody;
