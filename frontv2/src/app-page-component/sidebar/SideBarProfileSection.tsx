import React from 'react';
import Image from 'next/image';
import {PowerIcon} from '@heroicons/react/20/solid';
import {signOut} from 'next-auth/react';
import {useUserSessionSelector} from '@/redux/auth/user/user.slice';

function SideBarProfileSection() {
  const {isAuthenticated} = useUserSessionSelector();
  if (isAuthenticated) {
    return (
      <div className="flex flex-shrink-0 bg-gray-700 p-4">
        <a
          href="#"
          className="group w-full flex-shrink-0 flex justify-between items-center">
          <div className="flex items-center">
            <div>
              <Image
                loader={() => {
                  return `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`;
                }}
                className="inline-block h-9 w-9 rounded-full"
                src=""
                alt=""
                width={10}
                height={10}
              />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">Tom Cook</p>
              <p className="text-xs font-medium text-gray-300 group-hover:text-gray-200">
                View profile
              </p>
            </div>
          </div>
          <div>
            <PowerIcon
              className="h-6 w-6 text-white hover:text-gray-400"
              onClick={() => {
                signOut();
              }}
            />
          </div>
        </a>
      </div>
    );
  }
  return null;
}

export default SideBarProfileSection;
