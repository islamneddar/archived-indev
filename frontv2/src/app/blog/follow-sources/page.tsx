'use client';
import React from 'react';
import SourceBlogBody from '@/app-page-component/source_blog/SourceBlogBody';
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
        <SourceBlogBody></SourceBlogBody>
      </div>
    );
  }
}

export default Page;
