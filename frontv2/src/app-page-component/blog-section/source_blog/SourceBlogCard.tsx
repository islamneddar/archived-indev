'use client';
import React, {useEffect} from 'react';
import {FollowSourceBlogRequest, SourceBlog} from '@/types/api/source_blog';
import {StarIcon} from '@heroicons/react/20/solid';
import {useUserSessionSelector} from '@/redux/slices/auth/user/user.selector';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import {followSourceBlogThunk} from '@/redux/slices/source_blog/follow-source-blog/follow-source-blog.thunk';
import {useFollowSourceBlogSelector} from '@/redux/slices/source_blog/follow-source-blog/follow-source-blog.selector';
import PrimaryButton from '@/components/button/PrimaryButton';
import {formatCompactNumber} from '@/utils/general';

interface ISourceBlogCardProps {
  sourceBlog: SourceBlog;
}
function SourceBlogCard(props: ISourceBlogCardProps) {
  const dispatchThunk = useDispatch<ThunkDispatch<any, any, any>>();

  const sourceBlog = props.sourceBlog;
  const [followed, setFollowed] = React.useState(sourceBlog.isFollow);
  const userSession = useUserSessionSelector();
  const followSourceBlogSelector = useFollowSourceBlogSelector();

  useEffect(() => {
    if (followSourceBlogSelector.error) {
      setFollowed(!followed);
    }
  }, [followSourceBlogSelector.error]);

  const follow = () => {
    setFollowed(!followed);
    const followSourceBlogRequest: FollowSourceBlogRequest = {
      accessToken: userSession.user.accessToken,
      sourceBlogId: sourceBlog.sourceBlogId,
      isFollow: !followed,
    };
    dispatchThunk(followSourceBlogThunk(followSourceBlogRequest));
  };

  return (
    <div className={'bg-gray-700 rounded-xl p-5 flex w-full'}>
      <div className={'flex flex-row w-full w-full'}>
        <div className={'flex justify-center mr-6'}>
          <img src={sourceBlog.image} className={'w-12 h-12 rounded-md'} />
        </div>
        <div className={'flex flex-col w-full'}>
          <div className={'flex flex-row justify-between w-full'}>
            <div className={'flex flex-row items-center justify-start gap-3'}>
              <div>
                <p className={'text-18 font-medium'}>{sourceBlog.name}</p>
              </div>
            </div>
            <div className={'flex justify-center items-center'}>
              <PrimaryButton
                title={'Follow'}
                loading={false}
                disabled={false}
                buttonClassName={'p-1'}
              />
            </div>
          </div>
          <div className={'h-5 flex'}></div>
          <div className={'flex'}>
            <div className={'mr-10'}>
              <p className={'text-14'}>
                {formatCompactNumber(sourceBlog.numberFollowers)}
              </p>
              <p className={'text-12 text-gray-400'}>Followers</p>
            </div>
            {/*<div>
                <p className={'text-14'}>
                  {formatCompactNumber(sourceBlog.numberBlogs)}
                </p>
                <p className={'text-12 text-gray-400'}>Blogs</p>
              </div>*/}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SourceBlogCard;
