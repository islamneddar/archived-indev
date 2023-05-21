import React from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import {NavigationType} from '@/types/general/sidebar.type';
import {usePathname, useRouter} from 'next/navigation';
import SideBarItem from '@/app-page-component/sidebar/SideBarItem';
import SideBarProfileSection from '@/app-page-component/sidebar/SideBarProfileSection';
import FooterSideBar from '@/app-page-component/sidebar/FooterSideBar';

interface SideBarDesktopProps {
  navigation: NavigationType[];
}

export default function SideBarDesktop(props: SideBarDesktopProps) {
  const router = useRouter();
  return (
    <div className="hidden lg:fixed lg:bottom-0 lg:top-24 lg:flex lg:w-64 lg:flex-col shadow-xl">
      {/* Sidebar component, swap this element with another sidebar if you like */}
      <div className="flex min-h-0 flex-1 flex-col ">
        <div className="flex flex-1 flex-col overflow-y-auto  pb-4">
          <nav className="mt-5 flex-1 space-y-1 px-2">
            {props.navigation.map(item => {
              return <SideBarItem key={item.name} item={item}></SideBarItem>;
            })}
          </nav>
        </div>
      </div>
      <SideBarProfileSection></SideBarProfileSection>
      <FooterSideBar></FooterSideBar>
    </div>
  );
}
