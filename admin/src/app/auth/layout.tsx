'use client';
import React from 'react';
import useSessionAuthClient from '@/hooks/useSessionAuthClient';
import {useRouter} from 'next/navigation';
import {routingConstant} from '@/routing/routing.constant';

function Layout({children}: {children: React.ReactNode}) {
  const {session, adminSessionSelector} = useSessionAuthClient();

  const router = useRouter();

  if (session.status === 'loading') {
    return <></>;
  } else if (session.status === 'authenticated') {
    return router.push(routingConstant.admin.home.root);
  } else {
    return <>{children}</>;
  }
}

export default Layout;
