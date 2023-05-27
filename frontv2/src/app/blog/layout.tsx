'use client';
import NavBar from '@/app-page-component/navbar/NavBar';
import React, {Fragment, useEffect} from 'react';
import {signOut, useSession} from 'next-auth/react';
import {updateAuth} from '@/redux/auth/user/user.slice';
import {useDispatch} from 'react-redux';
import SideBarDesktop from '@/app-page-component/sidebar/SideBarDesktop';
import {HomeIcon, UsersIcon} from '@heroicons/react/20/solid';
import routing from '@/routes/routing.constant';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {getUserProfileThunk} from '@/redux/auth/user/user.thunk';
import {EventBusFront, EventBusFrontType} from '@/events/event_bus';
import {useUserSessionSelector} from '@/redux/auth/user/user.selector';
import {NavigationType} from '@/types/general/sidebar.type';

const navigationState: NavigationType[] = [
  {
    name: 'home',
    href: routing.blog.home,
    icon: HomeIcon,
    isAuth: false,
  },
  {
    name: 'follow source',
    href: routing.blog.followSource,
    icon: UsersIcon,
    isAuth: true,
  },
];

export default function Layout({children}: {children: React.ReactNode}) {
  const dispatch = useDispatch();
  const dispatchThunk = useDispatch<ThunkDispatch<any, any, any>>();
  const {loading, error, user} = useUserSessionSelector();

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
    console.log('session', session.status);
    const isAuth = session.status === 'authenticated';
    // @ts-ignore
    const accessToken = session.data?.user?.accessToken;
    dispatch(updateAuth({isAuthenticated: isAuth, accessToken: accessToken}));
    if (session.status === 'authenticated') {
      dispatchThunk(getUserProfileThunk(accessToken));
    }
  }, [
    dispatch,
    dispatchThunk,
    session.data,
    // @ts-ignore
    session.data?.user?.accessToken,
    session.status,
  ]);

  if (error) {
    console.log('error', error);
    //EventBusFront.dispatch(EventBusFrontType.LOGOUT, null);
  }

  // Rendering
  if (session.status === 'loading' || loading) {
    return <></>;
  }

  if (
    (session.status === 'authenticated' && user.email.length > 0) ||
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
