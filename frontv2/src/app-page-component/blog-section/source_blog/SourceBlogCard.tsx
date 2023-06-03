'use client';
import React, {useEffect} from 'react';
import {FollowSourceBlogRequest, SourceBlog} from '@/types/api/source_blog';
import {StarIcon} from '@heroicons/react/20/solid';
import {useUserSessionSelector} from '@/redux/auth/user/user.selector';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import {followSourceBlogThunk} from '@/redux/source_blog/follow-source-blog/follow-source-blog.thunk';
import {useFollowSourceBlogSelector} from '@/redux/source_blog/follow-source-blog/follow-source-blog.selector';

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

  return (
    <div className={'bg-gray-700 rounded-xl p-3 w-354'}>
      <div className={'flex justify-between'}>
        <div className={'flex flex-row items-center justify-start gap-3'}>
          <div>
            <img src={sourceBlog.image} className={'w-8 h-8 rounded-md'} />
          </div>
          <div>
            <p>{sourceBlog.name}</p>
          </div>
        </div>
        <div className={'flex justify-center items-center'}>
          <StarIcon
            className={`h-6 w-6 ${
              followed ? 'text-yellow-400' : 'text-gray-400'
            } hover:cursor-pointer`}
            onClick={() => {
              setFollowed(!followed);
              //dispatch follow or unfollow
              const followSourceBlogRequest: FollowSourceBlogRequest = {
                accessToken: userSession.user.accessToken,
                sourceBlogId: sourceBlog.sourceBlogId,
                isFollow: !followed,
              };
              dispatchThunk(followSourceBlogThunk(followSourceBlogRequest));
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default SourceBlogCard;
