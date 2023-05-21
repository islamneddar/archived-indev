'use client';
import React from 'react';
import SourceBlogBody from '@/app-page-component/source_blog/SourceBlogBody';
import {useSession} from 'next-auth/react';
import routing from '@/routes/routing.constant';
import {useRouter} from 'next/navigation';

function Page() {
  const router = useRouter();
  useSession({
    required: true,
    onUnauthenticated() {
      router.push(routing.auth.login);
    },
  });
  return (
    <div className={'p-5 w-full flex'}>
      <SourceBlogBody></SourceBlogBody>
    </div>
  );
}

export default Page;
