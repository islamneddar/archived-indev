import React from 'react';
import Image from 'next/image';
import {useDispatch} from 'react-redux';
import {logoInDev} from '../../assets/images';
import {AiOutlineMenu} from 'react-icons/all';

function NavBar() {
  const dispatch = useDispatch();
  return (
    <div className="h-24 bg-primary px-10">
      {
        // height : 96px
      }
      <div className="flex flex-row justify-between md:items-center h-full">
        <div className="h-full flex justify-center items-center">
          <Image src={logoInDev} alt="logo" className="h-16 w-16" />
        </div>

        <div className="md:hidden h-full flex justify-center">
          <AiOutlineMenu
            className="w-8 cursor-pointer"
            onClick={() => {
              //dispatch(toggleSideBarTopic());
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default NavBar;
