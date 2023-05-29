import React from 'react';
import SideBarItem from '@/app-page-component/sidebar/desktop/SideBarItem';
import SideBarProfileSection from '@/app-page-component/sidebar/desktop/SideBarProfileSection';
import FooterSideBar from '@/app-page-component/sidebar/desktop/FooterSideBar';
import {SideBarDesktopProps} from '@/app-page-component/sidebar/SideBarMain';

export default function SideBarDesktop(props: SideBarDesktopProps) {
  return (
    <div className="hidden md:fixed md:bottom-0 md:top-24 md:flex md:w-64 md:flex-col shadow-xl">
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
