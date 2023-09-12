'use client';
import React from 'react';
import {routingConstant} from '@/routing/routing.constant';
import {useRouter} from 'next/navigation';

function Page() {
  const router = useRouter();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <a
        onClick={() => {
          location.href = routingConstant.admin.aiTool.aiToolCreation;
        }}
        className={'cursor-pointer'}>
        to ai-tool-creation
      </a>
    </main>
  );
}

export default Page;
