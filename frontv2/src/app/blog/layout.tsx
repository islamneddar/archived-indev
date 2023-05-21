'use client';
import NavBar from '@/app-page-component/navbar/NavBar';
import React, {Fragment, useEffect} from 'react';
import {signOut, useSession} from 'next-auth/react';
import {updateAuth, useUserSessionSelector} from '@/redux/auth/user/user.slice';
import {useDispatch} from 'react-redux';
import SideBarDesktop from '@/app-page-component/sidebar/SideBarDesktop';
import {HomeIcon, UsersIcon} from '@heroicons/react/20/solid';
import routing from '@/routes/routing.constant';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {getUserProfileThunk} from '@/redux/auth/user/user.thunk';
import {EventBusFront, EventBusFrontType} from '@/events/event_bus';

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

export default function Layout({children}: {children: React.ReactNode}) {
  const dispatch = useDispatch();
  const dispatchThunk = useDispatch<ThunkDispatch<any, any, any>>();

  const {loading, error, data} = useUserSessionSelector();

  const session = useSession({
    required: false,
  });

  useEffect(() => {
    EventBusFront.on(EventBusFrontType.LOGOUT, async () => {
      console.log('logout');
      await signOut();
    });
  }, []);

  useEffect(() => {
    dispatch(updateAuth(session.status === 'authenticated'));
    if (session.status === 'authenticated') {
      // @ts-ignore
      dispatchThunk(getUserProfileThunk(session.data?.user?.accessToken));
      console.log('session', session.data);
    }
  }, [
    dispatch,
    dispatchThunk,
    session.data,
    // @ts-ignore
    session.data?.user?.accessToken,
    session.status,
  ]);

  console.log(error);
  if (error) {
    EventBusFront.dispatch(EventBusFrontType.LOGOUT, null);
  }

  // Rendering
  if (session.status === 'loading' || loading) {
    return <></>;
  }

  if (
    (session.status === 'authenticated' && data) ||
    session.status === 'unauthenticated'
  ) {
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

  return null;
}
