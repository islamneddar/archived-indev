'use client';

import React from 'react';
import {usePathname, useRouter} from 'next/navigation';

function Page() {
  // get the pathname
  const pathname = usePathname();

  const partsPathname = pathname?.split('/');

  const category = partsPathname?.[partsPathname.length - 1];

  // state

  // effects

  return (
    <div>
      <p>{category}</p>
    </div>
  );
}

export default Page;
