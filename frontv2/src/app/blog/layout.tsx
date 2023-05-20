'use client';
import NavBar from '@/app-page-component/navbar/NavBar';
import React, {Fragment} from 'react';
import {useSession} from 'next-auth/react';
import {updateAuth} from '@/redux/auth/user/user.slice';
import {useDispatch} from 'react-redux';
import SideBarDesktop from '@/app-page-component/sidebar/SideBarDesktop';
import {HomeIcon, UsersIcon} from '@heroicons/react/20/solid';
import routing from '@/routes/routing.constant';

export default function Layout({children}: {children: React.ReactNode}) {
  const dispatch = useDispatch();

  const session = useSession({
    required: false,
  });

  const navigationState = [
    {
      name: 'home',
      href: routing.blog.home,
      icon: HomeIcon,
    },
    {
      name: 'follow source',
      href: routing.blog.followSource,
      icon: UsersIcon,
    },
  ];

  dispatch(updateAuth(session.status === 'authenticated'));

  if (session.status === 'loading') {
    return <></>;
  }

  return (
    <>
      <NavBar />
      <div className="bg-secondary h-[calc(100vh_-_96px)]">
        <SideBarDesktop navigation={navigationState} />
        <Fragment>
          <div className={' w-full pl-64'}>{children}</div>
        </Fragment>
      </div>
    </>
  );
}
