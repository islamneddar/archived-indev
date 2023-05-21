'use client';
import NavBar from '@/app-page-component/navbar/NavBar';
import React, {Fragment, useEffect} from 'react';
import {useSession} from 'next-auth/react';
import {updateAuth} from '@/redux/auth/user/user.slice';
import {useDispatch} from 'react-redux';
import SideBarDesktop from '@/app-page-component/sidebar/SideBarDesktop';
import {HomeIcon, UsersIcon} from '@heroicons/react/20/solid';
import routing from '@/routes/routing.constant';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {getUserProfileThunk} from '@/redux/auth/user/user.thunk';

export default function Layout({children}: {children: React.ReactNode}) {
  const dispatch = useDispatch();
  const dispatchThunk = useDispatch<ThunkDispatch<any, any, any>>();

  const session = useSession({
    required: false,
  });

  useEffect(() => {
    dispatch(updateAuth(session.status === 'authenticated'));
    if (session.status === 'authenticated') {
      dispatchThunk(getUserProfileThunk(session.data?.user.accessToken));
    }
  }, [dispatch, dispatchThunk, session.data?.user.accessToken, session.status]);

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
