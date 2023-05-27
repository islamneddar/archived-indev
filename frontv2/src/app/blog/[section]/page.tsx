'use client';
import React from 'react';
import routing from '@/routes/routing.constant';
import BlogsBody from '@/app-page-component/blog/BlogsBody';
import {TypeFeed} from '@/types/api/source_blog';
import SourceBlogBody from '@/app-page-component/source_blog/SourceBlogBody';
import {useUserSessionSelector} from '@/redux/auth/user/user.selector';

function Page({params}: {params: {section: string}}) {
  const userSessionSelector = useUserSessionSelector();
  if (routing.blog.home.includes(params.section)) {
    return <BlogsBody></BlogsBody>;
  }

  if (routing.blog.followSource.includes(params.section)) {
    if (!userSessionSelector.isAuthenticated) {
      //router.push('/auth/login');
      console.debug('go to login');
    } else {
      return (
        <div className={'p-5 w-full flex'}>
          <SourceBlogBody></SourceBlogBody>
        </div>
      );
    }
  }
  return <div>{params.section}</div>;
}

export default Page;
