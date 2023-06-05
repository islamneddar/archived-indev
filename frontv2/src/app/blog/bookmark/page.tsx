'use client';
import React from 'react';
import BookmarkBlogBody from '@/app-page-component/blog-section/bookmarks/BookmarkBlogBody';
import {useRouter} from 'next/navigation';
import {useUserSessionSelector} from '@/redux/auth/user/user.selector';

function Page() {
  const router = useRouter();
  const userSessionSelector = useUserSessionSelector();

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

export default Page;
