import React, {useEffect} from 'react';
import {LightBulbIcon} from '@heroicons/react/24/outline';
import {LightBulbIcon as LightBulbIconSolid} from '@heroicons/react/24/solid';
import {Blog, BookmarkBlogRequest, LikeBlogRequest} from '@/types/api/blog';
import {useLikeBlogSelector} from '@/redux/blog/like-blog/like-blog.selector';
import {useUserSessionSelector} from '@/redux/auth/user/user.selector';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import {likeBlogThunk} from '@/redux/blog/like-blog/like-blog.thunk';
import toast from 'react-hot-toast';
import {BookmarkIcon} from '@heroicons/react/24/outline';
import {BookmarkIcon as BookmarkIconSolid} from '@heroicons/react/24/solid';
import {bookmarkBlogThunk} from '@/redux/blog/bookmark-blog/bookmark-blog.thunk';
import {useBookmarkBlogSelector} from '@/redux/blog/bookmark-blog/bookmark-blog.selector';
import {GridBlogType} from '@/types/general/blog-general.type';

interface IReactionGroupButtonCardProps {
  classNameContainer: string;
  blog: Blog;
  gridBlogType?: GridBlogType;
}
function ReactionGroupButtonCardBlog(props: IReactionGroupButtonCardProps) {
  const dispatchThunk = useDispatch<ThunkDispatch<any, any, any>>();
  const userSessionSelector = useUserSessionSelector();

  const blog = props.blog;
  const [isLiked, setIsLiked] = React.useState<boolean>(
    userSessionSelector.isAuthenticated ? blog.isLiked : false,
  );
  const [totalLike, setTotalLikes] = React.useState<number>(blog.totalLike);
  const [isBookmarked, setIsBookmarked] = React.useState<boolean>(
    userSessionSelector.isAuthenticated ? blog.isBookmarked : false,
  );

  const likeBlogSelector = useLikeBlogSelector();
  const bookmarkBlogSelector = useBookmarkBlogSelector();

  useEffect(() => {
    if (likeBlogSelector.error) {
      setTotalLikes(isLiked ? Number(totalLike) - 1 : Number(totalLike) + 1);
      setIsLiked(!isLiked);
      toast.error('internal error, we will try to fix it as soon as possible');
    }
  }, [likeBlogSelector.error]);

  useEffect(() => {
    if (bookmarkBlogSelector.error) {
      setIsBookmarked(!isBookmarked);
      toast.error('internal error, we will try to fix it as soon as possible');
    }
  }, [bookmarkBlogSelector.error]);

  const clickLikeButton = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    if (!userSessionSelector.isAuthenticated) {
      toast.error('You need to login first');
      return;
    }
    setTotalLikes(isLiked ? Number(totalLike) - 1 : Number(totalLike) + 1);
    setIsLiked(!isLiked);

    const likeBlogRequest: LikeBlogRequest = {
      blogId: blog.blogId,
      isLiked: !isLiked,
      accessToken: userSessionSelector.user.accessToken,
    };

    dispatchThunk(likeBlogThunk(likeBlogRequest));
  };

  const clickBookmarkButton = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    if (!userSessionSelector.isAuthenticated) {
      toast.error('You need to login first');
      return;
    }

    const bookMarkBlogRequest: BookmarkBlogRequest = {
      blogId: blog.blogId,
      isBookmarked: !isBookmarked,
      accessToken: userSessionSelector.user.accessToken,
    };
    dispatchThunk(bookmarkBlogThunk(bookMarkBlogRequest));
    setIsBookmarked(!isBookmarked);
  };

  return (
    <div className={`${props.classNameContainer}`}>
      <div
        className={`flex  ${
          props.gridBlogType === GridBlogType.LIST
            ? 'flex-col h-full pb-2'
            : 'flex-row'
        } justify-between items-center gap-1 `}>
        <div className={'flex flex-row items-center gap-1'}>
          <div
            onClick={event => {
              clickLikeButton(event);
            }}>
            {isLiked ? (
              <LightBulbIconSolid className="h-5 w-5 text-yellow-400 font-medium hover:scale-125 cursor-pointer" />
            ) : (
              <LightBulbIcon className="h-5 w-5 text-white font-medium hover:scale-125 cursor-pointer" />
            )}
          </div>
          <p className={'text-14 font-normal'}>{totalLike}</p>
        </div>
        <div
          onClick={event => {
            clickBookmarkButton(event);
          }}>
          {isBookmarked ? (
            <BookmarkIconSolid className="h-6 w-6 text-yellow-400 cursor-pointer" />
          ) : (
            <BookmarkIcon className="h-6 w-6 text-white cursor-pointer" />
          )}
        </div>
      </div>
    </div>
  );
}

export default ReactionGroupButtonCardBlog;
