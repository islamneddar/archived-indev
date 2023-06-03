'use client';
import React from 'react';
import routing from '@/routes/routing.constant';
import BlogsBody from '@/app-page-component/blog-section/blogs/BlogsBody';
import SourceBlogBody from '@/app-page-component/blog-section/source_blog/SourceBlogBody';
import {useUserSessionSelector} from '@/redux/auth/user/user.selector';
import {useRouter} from 'next/navigation';
import BookmarkBlogBody from '@/app-page-component/blog-section/bookmarks/BookmarkBlogBody';

function SectionPage({params}: {params: {section: string}}) {
  const userSessionSelector = useUserSessionSelector();
  const router = useRouter();

  if (params.section === 'home') {
    return <BlogsBody></BlogsBody>;
  }

  if (params.section === 'follow-sources') {
    if (!userSessionSelector.isAuthenticated) {
      router.push('/auth/login');
    } else {
      return (
        <div className={'p-5 w-full flex'}>
          <SourceBlogBody></SourceBlogBody>
        </div>
      );
    }
  }

  if (params.section === 'bookmark') {
    if (!userSessionSelector.isAuthenticated) {
      router.push('/auth/login');
    } else {
      return (
        <div className={'p-5 w-full flex'}>
          <BookmarkBlogBody></BookmarkBlogBody>
        </div>
      );
    }
  }
}

export default SectionPage;
