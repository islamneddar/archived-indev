import React from 'react';
import Image from 'next/image';
import {logoInDev} from '../../assets/images';
import {AiOutlineMenu} from 'react-icons/all';
import {useRouter} from 'next/navigation';
import AuthContainer from '@/app-page-component/navbar/auth/AuthContainer';
function NavBar() {
  const router = useRouter();

  return (
    <div className="h-24 bg-primary sm:px-3 md:px-5 flex justify-between">
      {
        // height : 96px
      }
      <div className="md:hidden h-full sm:flex justify-center items-center">
        <AiOutlineMenu
          className="w-8 h-8 cursor-pointer"
          onClick={() => {
            //dispatch(toggleSideBarTopic());
          }}
        />
      </div>
      <div className="flex flex-row justify-between md:items-center h-full">
        <div className="h-full flex justify-center items-center">
          <Image src={logoInDev} alt="logo" className="h-12 w-12" />
        </div>
      </div>
      <AuthContainer></AuthContainer>
    </div>
  );
}

export default NavBar;
