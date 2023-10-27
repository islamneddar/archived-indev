'use client';
import React from 'react';
import {routingConstant} from '@/routing/routing.constant';
import {useRouter} from 'next/navigation';
import {useAdminSessionSelector} from '@/redux/slices/auth/admin/admin.selector';
import {useQuery} from 'react-query';
import {AiToolService} from '@/service/ai-tool.service';

function Page() {
  const router = useRouter();
  const adminSelector = useAdminSessionSelector();

  return (
    <main className="flex min-h-screen flex-col gap-4 p-24">
      <div className={'justify-center items-center w-full self-center flex'}>
        <h2>List of Action</h2>
      </div>
      <a
        onClick={() => {
          location.href = routingConstant.admin.aiTool.aiToolCreation;
        }}
        className={
          'cursor-pointer border-1 p-2 rounded-xl border-amber-600 justify-center items-center flex'
        }>
        Create AI Tool
      </a>
      {adminSelector.user.role === 'admin' && (
        <a
          onClick={() => {
            location.href =
              routingConstant.admin.aiTool.listInvalid + `?page=1`;
          }}
          className={
            'cursor-pointer border-1 p-2 rounded-xl border-amber-600 justify-center items-center flex'
          }>
          List Invalid AI Tool
        </a>
      )}
    </main>
  );
}

export default Page;
