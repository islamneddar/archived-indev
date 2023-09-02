import React from 'react';
import Image from 'next/image';
import {logoInDev} from '../../assets/images';
import {AiOutlineMenu} from 'react-icons/all';
import {usePathname, useRouter} from 'next/navigation';
import AuthContainer from '@/app-page-component/navbar/auth/AuthContainer';
import {toggleSideBarMobile} from '@/redux/slices/system/system.slice';
import {useDispatch} from 'react-redux';
import LogoContainer from '@/app-page-component/navbar/LogoContainer';
import routing from '@/routes/routing.constant';
function NavBar() {
  const dispatch = useDispatch();
  return (
    <div className="h-24 bg-primary tn:px-3 md:px-5 flex justify-between">
      {
        // height : 96px
      }
      <div className="md:hidden h-full tn:flex justify-center items-center">
        <AiOutlineMenu
          className="w-8 h-8 cursor-pointer"
          onClick={() => {
            dispatch(toggleSideBarMobile(true));
          }}
        />
      </div>
      <div className="flex flex-row justify-between md:items-center h-full">
        <div className="h-full flex justify-center items-center">
          <LogoContainer></LogoContainer>
        </div>
      </div>
      <div className={'flex items-center'}>
        <div className={'flex justify-end pr-5'}>
          <a
            className={'text-sm font-semi-bold cursor-pointer'}
            href={routing.blog.root}>
            Ai News
          </a>
        </div>
        <div className={'flex justify-end pr-5'}>
          <a
            className={'text-sm font-semi-bold cursor-pointer'}
            href={routing.aiTools.root}>
            Ai Tool
          </a>
        </div>
        <AuthContainer></AuthContainer>
      </div>
    </div>
  );
}

export default NavBar;
