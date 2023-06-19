'use client';
import React, {useEffect} from 'react';
import {FollowSourceBlogRequest, SourceBlog} from '@/types/api/source_blog';
import {useUserSessionSelector} from '@/redux/slices/auth/user/user.selector';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import {followSourceBlogThunk} from '@/redux/slices/source_blog/api/follow-source-blog/follow-source-blog.thunk';
import {useFollowSourceBlogSelector} from '@/redux/slices/source_blog/api/follow-source-blog/follow-source-blog.selector';
import PrimaryButton from '@/components/button/PrimaryButton';
import {formatCompactNumber} from '@/utils/general';
import {usePathname, useRouter} from 'next/navigation';
import {toggleSideOverForGetBlogsBySourceBlog} from '@/redux/slices/system/system.slice';
import {setSourceBlog} from '@/redux/slices/source_blog/source-blog-state/source-blog-state.slice';

interface ISourceBlogCardProps {
  sourceBlog: SourceBlog;
}
function SourceBlogCard(props: ISourceBlogCardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatchThunk = useDispatch<ThunkDispatch<any, any, any>>();
  const dispatch = useDispatch();
  const sourceBlog = props.sourceBlog;
  const [followed, setFollowed] = React.useState<boolean>(sourceBlog.isFollow);
  const userSession = useUserSessionSelector();
  const followSourceBlogSelector = useFollowSourceBlogSelector();
  const [followerCount, setFollowerCount] = React.useState<number>(
    sourceBlog.numberFollowers,
  );

  useEffect(() => {
    setFollowed(sourceBlog.isFollow);
  }, [sourceBlog.isFollow]);

  useEffect(() => {
    setFollowerCount(sourceBlog.numberFollowers);
  }, [sourceBlog.numberFollowers]);

  useEffect(() => {
    if (followSourceBlogSelector.error) {
      setFollowed(!followed);
      setFollowerCount(
        followed ? Number(followerCount) - 1 : Number(followerCount) + 1,
      );
    }
  }, [followSourceBlogSelector.error]);

  const follow = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setFollowed(!followed);
    setFollowerCount(
      followed ? Number(followerCount) - 1 : Number(followerCount) + 1,
    );
    const followSourceBlogRequest: FollowSourceBlogRequest = {
      accessToken: userSession.user.accessToken,
      sourceBlogId: sourceBlog.sourceBlogId,
      isFollow: !followed,
    };
    dispatchThunk(followSourceBlogThunk(followSourceBlogRequest));
  };

  const openBlogsOfType = () => {
    router.replace(pathname + '?type_source=' + sourceBlog.sourceBlogId);
    dispatch(setSourceBlog(sourceBlog));
    dispatch(toggleSideOverForGetBlogsBySourceBlog(true));
  };

  return (
    <div
      className={'bg-gray-700 rounded-xl p-5 flex w-full cursor-pointer'}
      onClick={() => {
        openBlogsOfType();
      }}>
      <div className={'flex flex-row w-full'}>
        <div className={'flex justify-center mr-6'}>
          <img src={sourceBlog.image} className={'w-12 h-12 rounded-md'} />
        </div>
        <div className={'flex flex-col w-full'}>
          <div className={'flex flex-row justify-between w-full'}>
            <div className={'flex flex-row items-center justify-start gap-3'}>
              <div>
                <p className={'text-18 font-medium line-clamp-1'}>
                  {sourceBlog.name}
                </p>
              </div>
            </div>
            <div className={'flex justify-center items-center'}>
              <PrimaryButton
                title={followed ? 'Following' : 'Follow'}
                loading={false}
                disabled={false}
                buttonClassName={`p-1 ${
                  followed ? ' text-indigo-500 bg-white hover:bg-gray-100' : ''
                }`}
                onClick={event => {
                  follow(event);
                }}
              />
            </div>
          </div>
          <div className={'h-5 flex'}></div>
          <div className={'flex'}>
            <div className={'mr-10'}>
              <p className={'text-14'}>
                {formatCompactNumber(followerCount) || 0}
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
