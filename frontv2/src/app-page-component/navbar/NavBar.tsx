import React from 'react';
import Image from 'next/image';
import {logoInDev} from '../../assets/images';
import {AiOutlineMenu} from 'react-icons/all';
import {useRouter} from 'next/navigation';
import AuthContainer from '@/app-page-component/navbar/auth/AuthContainer';
import {toggleSideBarMobile} from '@/redux/system/system.slice';
import {useDispatch} from 'react-redux';
import LogoContainer from '@/app-page-component/navbar/LogoContainer';
function NavBar() {
  const router = useRouter();
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
      <AuthContainer></AuthContainer>
    </div>
  );
}

export default NavBar;
