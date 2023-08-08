'use client';

import React from 'react';
import {useRouter} from 'next/navigation';
import {useUserSessionSelector} from '@/redux/slices/auth/user/user.selector';
import PersonalizedFeedBlogBody from '@/app-page-component/blog-section/personnalized-feed/PersonalizedFeedBlogBody';

function Page() {
  const router = useRouter();
  const userSessionSelector = useUserSessionSelector();

  if (!userSessionSelector.isAuthenticated) {
    router.push('/auth/login');
  } else {
    return (
      <div className={' w-full flex'}>
        <PersonalizedFeedBlogBody></PersonalizedFeedBlogBody>
      </div>
    );
  }
}

export default Page;
