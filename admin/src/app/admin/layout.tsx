'use client';
import {useRouter} from 'next/navigation';
import useSessionAuthClient from '@/hooks/useSessionAuthClient';
import {routingConstant} from '@/routing/routing.constant';

export default function Layout({children}: {children: React.ReactNode}) {
  const {session, adminSessionSelector} = useSessionAuthClient();

  const router = useRouter();

  console.log(session, adminSessionSelector);
  if (session.status === 'loading' || adminSessionSelector.loading) {
    return <>Loading</>;
  } else if (session.status === 'authenticated') {
    return <>{children}</>;
  } else {
    console.log('redirecting to login');
    return router.push(routingConstant.auth.login);
  }
}
