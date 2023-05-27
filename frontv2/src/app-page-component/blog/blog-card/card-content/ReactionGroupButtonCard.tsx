import React, {useEffect} from 'react';
import {LightBulbIcon} from '@heroicons/react/24/outline';
import {LightBulbIcon as LightBulbIconSolid} from '@heroicons/react/24/solid';
import {Blog, LikeBlogRequest} from '@/types/api/blog';
import {useLikeBlogSelector} from '@/redux/blog/like-blog/like-blog.selector';
import {useUserSessionSelector} from '@/redux/auth/user/user.selector';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import {likeBlogThunk} from '@/redux/blog/like-blog/like-blog.thunk';
import toast from 'react-hot-toast';

interface IReactionGroupButtonCardProps {
  classNameContainer: string;
  blog: Blog;
}
function ReactionGroupButtonCardBlog(props: IReactionGroupButtonCardProps) {
  const dispatchThunk = useDispatch<ThunkDispatch<any, any, any>>();
  const userSessionSelector = useUserSessionSelector();

  const blog = props.blog;
  const [isLiked, setIsLiked] = React.useState<boolean>(
    userSessionSelector.isAuthenticated ? blog.isLiked : false,
  );
  const [totalLike, setTotalLikes] = React.useState<number>(blog.totalLike);
  const likeBlogSelector = useLikeBlogSelector();

  useEffect(() => {
    if (likeBlogSelector.error) {
      toast.error('internal error, we will try to fix it as soon as possible');
    }
  }, [likeBlogSelector.error]);

  return (
    <div className={`${props.classNameContainer}`}>
      <div className={'flex flex-row items-center gap-1'}>
        <div
          onClick={event => {
            event.stopPropagation();
            if (!userSessionSelector.isAuthenticated) {
              toast.error('You need to login first');
              return;
            }
            setTotalLikes(isLiked ? totalLike - 1 : totalLike + 1);
            setIsLiked(!isLiked);

            const likeBlogRequest: LikeBlogRequest = {
              blogId: blog.blogId,
              isLiked: !isLiked,
              accessToken: userSessionSelector.user.accessToken,
            };

            dispatchThunk(likeBlogThunk(likeBlogRequest));
          }}>
          {isLiked ? (
            <LightBulbIconSolid className="h-5 w-5 text-yellow-400 font-medium hover:scale-125 cursor-pointer" />
          ) : (
            <LightBulbIcon className="h-5 w-5 text-white font-medium hover:scale-125 cursor-pointer" />
          )}
        </div>
        <p className={'text-14 font-normal'}>{totalLike}</p>
      </div>
    </div>
  );
}

export default ReactionGroupButtonCardBlog;
