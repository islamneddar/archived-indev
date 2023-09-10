'use client';
import {useEffect} from 'react';
import {useUserSessionSelector} from '@/redux/slices/auth/user/user.selector';
import {signOut, useSession} from 'next-auth/react';

import {EventBusFront, EventBusFrontType} from '@/events/event_bus';
import {updateAuth} from '@/redux/slices/auth/user/user.slice';
import {getUserProfileThunk} from '@/redux/slices/auth/user/user.thunk';
import {useDispatch} from 'react-redux';
import {ThunkDispatch} from '@reduxjs/toolkit';

function UseSessionAuthClient() {
  const dispatch = useDispatch();
  const dispatchThunk = useDispatch<ThunkDispatch<any, any, any>>();

  const userSessionSelector = useUserSessionSelector();

  const session = useSession({
    required: false,
  });

  useEffect(() => {
    EventBusFront.on(EventBusFrontType.LOGOUT, async () => {
      dispatch(updateAuth({isAuthenticated: false, accessToken: null}));
      await signOut({
        callbackUrl: '/',
      });
    });
  }, []);

  useEffect(() => {
    if (userSessionSelector.success) {
      dispatch(
        updateAuth({
          isAuthenticated: true, // we fetched the data of a user
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

  return {session, userSessionSelector};
}

export default UseSessionAuthClient;
