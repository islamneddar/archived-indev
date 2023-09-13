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

  const adminSessionSelector = useAdminSessionSelector();

  const session = useSession({
    required: false,
  });

  if (session.status === 'authenticated') {
    const data = session.data as any;
    dispatch(
      updateAuth({
        isAuthenticated: true, // we fetched the data of a user
        // @ts-ignore
        accessToken: session.data?.user?.accessToken,
        email: data.admin?.email,
        username: data.admin?.username,
        role: data.admin?.role,
        id: data.admin?.id,
      }),
    );
  }

  useEffect(() => {
    EventBusFront.on(EventBusFrontType.LOGOUT, async () => {
      dispatch(updateAuth({isAuthenticated: false, accessToken: null}));
      await signOut({});
    });
  }, []);

  return {session, adminSessionSelector};
}

export default UseSessionAuthClient;
