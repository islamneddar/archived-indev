'use client';
import React from 'react';
import {SourceBlogTypeItemType} from '@/types/api/source_blog';
import PrimaryButton from '@/components/button/PrimaryButton';
import {useRouter} from 'next/navigation';
import routing from '@/routes/routing.constant';

interface SourceBlogTypeItemProps {
  sourceBlogType: SourceBlogTypeItemType;
}
function SourceBlogTypeItem(props: SourceBlogTypeItemProps) {
  const router = useRouter();

  const sourceBlogType = props.sourceBlogType;
  return (
    <div
      className={
        ' shadow-xl rounded-lg border-gray-600 border-1 cursor-pointer'
      }
      onClick={() => {
        router.push(routing.blog.followSource.feeds(sourceBlogType.value));
      }}>
      <div className={'flex w-full px-4 py-2 flex-col h-full justify-between'}>
        <div className={'flex flex-row justify-between items-center'}>
          <div>
            <h1 className={'font-bold text-18'}>{sourceBlogType.content}</h1>
          </div>
          <div>
            <PrimaryButton
              title={'Follow All'}
              loading={false}
              disabled={false}
              buttonClassName={'text-12'}
            />
          </div>
        </div>
        <div className={'my-3'}>
          <div className={''}>
            <p className={'text-12'}>
              <span className={'font-bold'}>{sourceBlogType.nbBlogs}</span>{' '}
              source blogs
            </p>
          </div>
        </div>
        <div className={'flex flex-row justify-start items-center'}>
          <div className={''}>
            <img
              src={sourceBlogType.featuredBlog.sourceBlogImage}
              className={'w-6 h-6 '}
            />
          </div>
          <div className={'ml-3'}>
            <div>
              <p className={'text-12 text-gray-400'}>Featured</p>
            </div>
            <div>
              <p className={'text-12'}>
                {sourceBlogType.featuredBlog.sourceBlogName}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SourceBlogTypeItem;
