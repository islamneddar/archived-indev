import React from 'react';
import FollowButton from '@/app-page-component/components/FollowButton';
import {formatCompactNumber} from '@/utils/general';
import {SourceBlog} from '@/types/api/source_blog';

interface IHeaderContentSideOverGetBlogsSourceBlogProps {
  sourceBlog: SourceBlog;
}
function HeaderContentSideOverGetBlogsSourceBlog(
  props: IHeaderContentSideOverGetBlogsSourceBlogProps,
) {
  const sourceBlog = props.sourceBlog;

  const [followerCount, setFollowerCount] = React.useState<number>(
    Number(sourceBlog.numberFollowers),
  );

  function follow() {
    console.log('follow');
  }

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
            {<FollowButton followed={sourceBlog.isFollow} follow={follow} />}
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
