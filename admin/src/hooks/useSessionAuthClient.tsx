'use client';
import {useEffect} from 'react';
import {useAdminSessionSelector} from '@/redux/slices/auth/admin/admin.selector';
import {signOut, useSession} from 'next-auth/react';

import {EventBusFront, EventBusFrontType} from '@/events/event_bus';
import {updateAuth} from '@/redux/slices/auth/admin/admin.slice';
import {getAdminProfileThunk} from '@/redux/slices/auth/admin/admin.thunk';
import {useDispatch} from 'react-redux';
import {ThunkDispatch} from '@reduxjs/toolkit';

function UseSessionAuthClient() {
  const dispatch = useDispatch();
  const dispatchThunk = useDispatch<ThunkDispatch<any, any, any>>();

  const adminSessionSelector = useAdminSessionSelector();

  const session = useSession({
    required: false,
  });

  useEffect(() => {
    EventBusFront.on(EventBusFrontType.LOGOUT, async () => {
      dispatch(updateAuth({isAuthenticated: false, accessToken: null}));
      await signOut({});
    });
  }, []);

  useEffect(() => {
    if (adminSessionSelector.success) {
      dispatch(
        updateAuth({
          isAuthenticated: true, // we fetched the data of a user
          // @ts-ignore
          accessToken: session.data?.user?.accessToken,
        }),
      );
    }
  }, [adminSessionSelector.success]);

  useEffect(() => {
    if (
      !adminSessionSelector.isAuthenticated &&
      session.status === 'authenticated'
    ) {
      // @ts-ignore
      const accessToken = session.data?.user?.accessToken;
      dispatchThunk(getAdminProfileThunk(accessToken));
    }
  }, [
    session.data,
    // @ts-ignore
    session.data?.user?.accessToken,
    session.status,
  ]);

  return {session, adminSessionSelector};
}

export default UseSessionAuthClient;
