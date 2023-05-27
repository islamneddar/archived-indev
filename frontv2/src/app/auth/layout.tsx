'use client';
import {useSession} from 'next-auth/react';
import {useRouter} from 'next/navigation';
import React from 'react';
import routing from '@/routes/routing.constant';

export default function AuthLayout({children}: {children: React.ReactNode}) {
  const {data: session, status} = useSession({
    required: false,
  });

  const router = useRouter();

  if (status === 'loading') {
    return <></>;
  } else if (status === 'authenticated') {
    return router.push(routing.blog.root);
  }

  return <>{children}</>;
}
