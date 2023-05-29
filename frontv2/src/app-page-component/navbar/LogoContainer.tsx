import React from 'react';
import Image from 'next/image';
import {logoInDev} from '@/assets/images';

function LogoContainer() {
  return (
    <>
      <Image src={logoInDev} alt="logo" className="h-12 w-12" />
    </>
  );
}

export default LogoContainer;
