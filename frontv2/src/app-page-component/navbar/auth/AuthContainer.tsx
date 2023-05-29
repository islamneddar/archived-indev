'use client';
import React, {useEffect, useRef, useState} from 'react';
import PrimaryButton from '@/components/button/PrimaryButton';
import routing from '@/routes/routing.constant';
import {useRouter} from 'next/navigation';
import {useUserSessionSelector} from '@/redux/auth/user/user.selector';
import {UserCircleIcon} from '@heroicons/react/24/solid';
import {Menu} from 'primereact/menu';
import {MenuItem} from 'primereact/menuitem';
import PrimeReact from 'primereact/api';

PrimeReact.appendTo = 'self';
PrimeReact.autoZIndex = true;
function AuthContainer() {
  const router = useRouter();
  const {isAuthenticated} = useUserSessionSelector();

  const [openUserRegisterModal, setOpenUserRegisterModal] =
    useState<boolean>(false);
  const items: MenuItem[] = [
    {
      label: 'Options',
      items: [
        {
          label: 'Login',
          icon: 'pi pi-refresh',
          command: () => {
            console.log('login');
          },
        },
        {
          label: 'Register',
          icon: 'pi pi-times',
          command: () => {
            console.log('register');
          },
        },
      ],
    },
  ];

  useEffect(() => {
    console.log('fdfdfsfs');
  }, []);

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
        <div
          className={'md:hidden flex h-full justify-center items-center mr-2'}>
          <UserCircleIcon
            className="h-12 w-12 text-gray-500 cursor-pointer"
            onClick={() => {
              setOpenUserRegisterModal(!openUserRegisterModal);
            }}
            aria-controls="popup_menu_right"
            aria-haspopup
          />
          <div
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
