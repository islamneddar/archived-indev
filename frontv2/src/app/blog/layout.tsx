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
import {Metadata} from 'next';

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
  const userSessionSelector = useUserSessionSelector();

  const session = useSession({
    required: false,
  });

  useEffect(() => {
    EventBusFront.on(EventBusFrontType.LOGOUT, async () => {
      dispatch(updateAuth({isAuthenticated: false, accessToken: null}));
      //await signOut();
      console.debug('logout');
    });
  }, []);

  useEffect(() => {
    if (userSessionSelector.success) {
      dispatch(
        updateAuth({
          isAuthenticated: true,
          // @ts-ignore
          accessToken: session.data?.user?.accessToken,
        }),
      );
    }
  }, [userSessionSelector.success]);

  useEffect(() => {
    if (
      !userSessionSelector.isAuthenticated &&
      session.status === 'authenticated'
    ) {
      // @ts-ignore
      const accessToken = session.data?.user?.accessToken;
      dispatchThunk(getUserProfileThunk(accessToken));
    }
  }, [
    session.data,
    // @ts-ignore
    session.data?.user?.accessToken,
    session.status,
  ]);

  useEffect(() => {
    if (userSessionSelector.error) {
      EventBusFront.dispatch(EventBusFrontType.LOGOUT, null);
    }
  }, [userSessionSelector.error]);

  // Rendering
  if (session.status === 'loading' || userSessionSelector.loading) {
    return <></>;
  }

  if (
    (session.status === 'authenticated' &&
      userSessionSelector.user.email.length > 0) ||
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
