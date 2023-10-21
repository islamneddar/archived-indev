'use client';
import NavBar from '@/app-page-component/navbar/NavBar';
import React, {Fragment, useEffect} from 'react';
import {signOut, useSession} from 'next-auth/react';
import {updateAuth} from '@/redux/slices/auth/user/user.slice';
import {useDispatch} from 'react-redux';
import {
  RssIcon,
  BookOpenIcon,
  AdjustmentsHorizontalIcon,
} from '@heroicons/react/20/solid';
import routing from '@/routes/routing.constant';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {getUserProfileThunk} from '@/redux/slices/auth/user/user.thunk';
import {EventBusFront, EventBusFrontType} from '@/infra/events/event_bus';
import {useUserSessionSelector} from '@/redux/slices/auth/user/user.selector';
import {NavigationType} from '@/types/general/sidebar.type';
import SideBarMain from '@/app-page-component/sidebar/SideBarMain';
import {GlobeEuropeAfricaIcon} from '@heroicons/react/24/solid';
import UseSessionAuthClient from '@/infra/hooks/useSessionAuthClient';

const navigationState: NavigationType[] = [
  {
    name: 'Explore',
    href: routing.blog.explore,
    icon: GlobeEuropeAfricaIcon,
    isAuth: false,
  },
  {
    name: 'My Feed',
    href: routing.blog.myFeed,
    icon: AdjustmentsHorizontalIcon,
    isAuth: true,
  },
  {
    name: 'Sources',
    href: routing.blog.followSource.home,
    icon: RssIcon,
    isAuth: true,
  },
  {
    name: 'Bookmarks',
    href: routing.blog.bookmark,
    icon: BookOpenIcon,
    isAuth: true,
  },
];

export default function Layout({children}: {children: React.ReactNode}) {
  const {session, userSessionSelector} = UseSessionAuthClient(); // Rendering

  if (
    (session.status === 'authenticated' &&
      userSessionSelector.isAuthenticated) ||
    session.status === 'unauthenticated'
  ) {
    return (
      <>
        <NavBar />
        <div className="bg-secondary h-[calc(100vh_-_96px)]">
          <SideBarMain navigation={navigationState} />
          <Fragment>
            <div className={' w-full md:pl-64'}>{children}</div>
          </Fragment>
        </div>
      </>
    );
  } else {
    return <div className={'h-screen bg-secondary'}></div>;
  }
}
