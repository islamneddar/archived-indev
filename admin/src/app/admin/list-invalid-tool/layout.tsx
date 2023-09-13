'use client';
import React from 'react';
import {useAdminSessionSelector} from '@/redux/slices/auth/admin/admin.selector';
import {routingConstant} from '@/routing/routing.constant';
import {router} from 'next/client';
import {DataTable} from 'primereact/datatable';
import {useParams, useSearchParams} from 'next/navigation';

function Layout({children}: {children: React.ReactNode}) {
  const adminSelector = useAdminSessionSelector();
  const params = useSearchParams();
  console.log(params);

  if (adminSelector.user.role !== 'admin') {
    return router.push(routingConstant.admin.home.root);
  }

  //const [listTools] = useGetInactiveListAITool();

  return (
    <div>
      {children}
      <p>{params?.get('page')}</p>
      <DataTable></DataTable>
    </div>
  );
}

export default Layout;
