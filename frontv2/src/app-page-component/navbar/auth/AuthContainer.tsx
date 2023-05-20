'use client';
import React from 'react';
import PrimaryButton from '@/components/button/PrimaryButton';
import routing from '@/routes/routing.constant';
import {useRouter} from 'next/navigation';
import {useUserSessionSelector} from '@/redux/auth/user/user.slice';

function AuthContainer() {
  const router = useRouter();
  const {isAuthenticated} = useUserSessionSelector();

  if (!isAuthenticated) {
    return (
      <div className={'flex justify-center items-center gap-2'}>
        <PrimaryButton
          title={'login'}
          loading={false}
          disabled={false}
          buttonClassName={'bg-transparent pointer-cursor'}
          onClick={() => {
            router.push(routing.auth.login);
          }}
        />
        <PrimaryButton title={'register'} loading={false} disabled={false} />
      </div>
    );
  }

  return null;
}

export default AuthContainer;
