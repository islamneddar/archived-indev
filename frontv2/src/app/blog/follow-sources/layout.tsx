'use client';
import React from 'react';
import {useRouter} from 'next/navigation';
import {useUserSessionSelector} from '@/redux/slices/auth/user/user.selector';

function Layout({children}: {children: React.ReactNode}) {
  const router = useRouter();
  const userSessionSelector = useUserSessionSelector();

  if (!userSessionSelector.isAuthenticated) {
    router.push('/auth/login');
  } else {
    return <div className={'p-5 w-full flex'}>{children}</div>;
  }
}

export default Layout;
