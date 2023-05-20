'use client';
import NavBar from '@/app-page-component/navbar/NavBar';
import React from 'react';
import {useSession} from 'next-auth/react';
import {updateAuth} from '@/redux/auth/user/user.slice';
import {useDispatch} from 'react-redux';

export default function Layout({children}: {children: React.ReactNode}) {
  const dispatch = useDispatch();

  const session = useSession({
    required: false,
  });

  dispatch(updateAuth(session.status === 'authenticated'));
  if (session.status === 'loading') {
    return <></>;
  }
  return (
    <>
      <NavBar />
      <div className="bg-secondary h-[calc(100vh_-_96px)]">{children}</div>
    </>
  );
}
