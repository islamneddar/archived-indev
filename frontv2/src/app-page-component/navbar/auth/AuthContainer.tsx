'use client';
import React, {useState} from 'react';
import PrimaryButton from '@/components/button/PrimaryButton';
import routing from '@/routes/routing.constant';
import {useRouter} from 'next/navigation';
import {useUserSessionSelector} from '@/redux/auth/user/user.selector';
import {UserCircleIcon} from '@heroicons/react/24/solid';
import PrimeReact from 'primereact/api';

PrimeReact.appendTo = 'self';
PrimeReact.autoZIndex = true;
function AuthContainer() {
  const router = useRouter();
  const {isAuthenticated} = useUserSessionSelector();

  const [openUserRegisterModal, setOpenUserRegisterModal] =
    useState<boolean>(false);

  if (!isAuthenticated) {
    return (
      <>
        <div className={'hidden md:flex justify-center items-center gap-2'}>
          <PrimaryButton
            title={'login'}
            loading={false}
            disabled={false}
            buttonClassName={'bg-transparent pointer-cursor'}
            onClick={() => {
              router.push(routing.auth.login);
            }}
          />
          <PrimaryButton
            title={'register'}
            loading={false}
            disabled={false}
            onClick={() => {
              router.push(routing.auth.signup);
            }}
          />
        </div>
        <div className={'md:hidden flex h-full justify-center items-center'}>
          <UserCircleIcon
            className="h-12 w-12 text-gray-500 cursor-pointer"
            onClick={() => {
              setOpenUserRegisterModal(!openUserRegisterModal);
            }}
            aria-controls="popup_menu_right"
            aria-haspopup
          />
          <div
            id={'popup_menu_not_auth_register'}
            className={` ${
              openUserRegisterModal ? 'absolute' : 'hidden'
            } top-20 right-2 w-32 bg-gray-400 z-50 rounded-xl`}>
            <div>
              <PrimaryButton
                title={'login'}
                loading={false}
                disabled={false}
                buttonClassName={'bg-transparent pointer-cursor w-full'}
                onClick={() => {
                  router.push(routing.auth.login);
                }}
              />
              <PrimaryButton
                title={'register'}
                loading={false}
                disabled={false}
                buttonClassName={'bg-transparent pointer-cursor w-full'}
                onClick={() => {
                  router.push(routing.auth.signup);
                }}
              />
            </div>
          </div>
        </div>
      </>
    );
  }

  return null;
}

export default AuthContainer;
