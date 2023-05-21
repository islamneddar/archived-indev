import React from 'react';
import {PowerIcon} from '@heroicons/react/20/solid';
import {signOut} from 'next-auth/react';
import {useUserSessionSelector} from '@/redux/auth/user/user.slice';
import {UserSession} from '@/types/general/user-session.type';
import {Avatar} from 'primereact/avatar';

function SideBarProfileSection() {
  const {data}: {data: UserSession} = useUserSessionSelector();

  const {isAuthenticated} = useUserSessionSelector();
  if (isAuthenticated) {
    return (
      <div className="flex flex-shrink-0 bg-gray-700 p-4">
        <a
          href="#"
          className="group w-full flex-shrink-0 flex justify-between items-center">
          <div className="flex items-center">
            <div>
              <Avatar
                label={data.username.charAt(0)}
                size="large"
                style={{backgroundColor: '#2196F3', color: '#ffffff'}}
                shape="circle"
              />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">{data.username}</p>
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
