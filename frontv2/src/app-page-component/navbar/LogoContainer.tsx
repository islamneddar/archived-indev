import React from 'react';
import Image from 'next/image';
import {logoInDev} from '@/assets/images';

function LogoContainer() {
  return (
    <>
      {
        //<Image src={logoInDev} alt="logo" className="h-12 w-12" />
      }
      <h3 className={'font-medium text-2xl'}>inaitimes</h3>
    </>
  );
}

export default LogoContainer;
