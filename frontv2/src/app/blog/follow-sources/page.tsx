'use client';
import React from 'react';
import {useUserSessionSelector} from '@/redux/auth/user/user.selector';
import {useRouter} from 'next/navigation';
import SourceBlogTypeBody from '@/app-page-component/blog-section/source_blog_type/SourceBlogTypeBody';

function Page() {
  const router = useRouter();
  const userSessionSelector = useUserSessionSelector();

  if (!userSessionSelector.isAuthenticated) {
    router.push('/auth/login');
  } else {
    return (
      <div className={'p-5 w-full flex'}>
        <SourceBlogTypeBody></SourceBlogTypeBody>
      </div>
    );
  }
}

export default Page;
