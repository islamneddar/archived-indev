import React, {useEffect} from 'react';
import FollowButton from '@/app-page-component/components/FollowButton';
import {formatCompactNumber} from '@/utils/general';
import {
  FollowSourceBlogRequest,
  SourceBlog,
} from '@/types/api/blogs/source_blog';
import {followSourceBlogThunk} from '@/redux/slices/blogs/source_blog/api/follow-source-blog/follow-source-blog.thunk';
import {useUserSessionSelector} from '@/redux/slices/auth/user/user.selector';
import {useDispatch} from 'react-redux';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {useFollowSourceBlogSelector} from '@/redux/slices/blogs/source_blog/api/follow-source-blog/follow-source-blog.selector';

interface IHeaderContentSideOverGetBlogsSourceBlogProps {
  sourceBlog: SourceBlog;
}
function HeaderContentSideOverGetBlogsSourceBlog(
  props: IHeaderContentSideOverGetBlogsSourceBlogProps,
) {
  const dispatchThunk = useDispatch<ThunkDispatch<any, any, any>>();

  const sourceBlog = props.sourceBlog;

  const [followed, setFollowed] = React.useState<boolean>(sourceBlog.isFollow);
  const [followerCount, setFollowerCount] = React.useState<number>(
    Number(sourceBlog.numberFollowers),
  );

  const userSession = useUserSessionSelector();
  const followSourceBlogSelector = useFollowSourceBlogSelector();

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

  useEffect(() => {
    if (followSourceBlogSelector.error) {
      setFollowed(!followed);
      setFollowerCount(
        followed ? Number(followerCount) - 1 : Number(followerCount) + 1,
      );
    }
  }, [followSourceBlogSelector.error]);

  return (
    <div className={'flex flex-row w-full'}>
      <div className={'pl-3 tn:pr-3 sm:pr-6 flex justify-center items-center'}>
        <img src={sourceBlog.image} className={'h-8 w-8'} />
      </div>
      <div className={'w-full '}>
        <div
          className={
            'tn:pl-2 sm:pl-5 flex flex-row w-full tn:gap-x-2 sm:gap-x-5'
          }>
          <div className={'flex justify-center items-center'}>
            <p className={'line-clamp-1'}>{sourceBlog.name}</p>
          </div>
          <div className={'flex justify-center items-center'}>
            {<FollowButton followed={followed} follow={follow} />}
          </div>
        </div>
        <div className={'h-3'}></div>
        <div className={'sm:ml-5 tn:pl-2'}>
          <p className={'font-bold'}>
            {formatCompactNumber(followerCount) || 0}
            <span className={'pl-1 text-gray-300 text-14 font-medium'}>
              Follower
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default HeaderContentSideOverGetBlogsSourceBlog;
