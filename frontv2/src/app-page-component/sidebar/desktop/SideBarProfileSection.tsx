import React from 'react';
import {PowerIcon} from '@heroicons/react/20/solid';
import {signOut} from 'next-auth/react';
import {Avatar} from 'primereact/avatar';
import {useUserSessionSelector} from '@/redux/slices/auth/user/user.selector';

function SideBarProfileSection() {
  const {user} = useUserSessionSelector();

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
                label={user.username.charAt(0)}
                size="large"
                style={{backgroundColor: '#2196F3', color: '#ffffff'}}
                shape="circle"
              />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">{user.username}</p>
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
