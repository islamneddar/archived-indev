'use client';
import {useRouter} from 'next/navigation';
import useSessionAuthClient from '@/hooks/useSessionAuthClient';
import {routingConstant} from '@/routing/routing.constant';

export default function Layout({children}: {children: React.ReactNode}) {
  const {session, adminSessionSelector} = useSessionAuthClient();

  const router = useRouter();

  if (session.status === 'loading') {
    return <></>;
  } else if (session.status === 'authenticated') {
    return <>{children}</>;
  } else {
    return router.push(routingConstant.auth.login);
  }
}
