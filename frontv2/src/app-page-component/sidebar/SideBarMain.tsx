import React from 'react';
import {NavigationType} from '@/types/general/sidebar.type';
import SideBarDesktop from '@/app-page-component/sidebar/desktop/SideBarDesktop';
import SideBarMobile from '@/app-page-component/sidebar/mobile/SideBarMobile';

export interface SideBarDesktopProps {
  navigation: NavigationType[];
}
function SideBarMain(props: SideBarDesktopProps) {
  return (
    <>
      <div>
        <SideBarDesktop navigation={props.navigation}></SideBarDesktop>
      </div>
      <div>
        <SideBarMobile navigation={props.navigation}></SideBarMobile>
      </div>
    </>
  );
}

export default SideBarMain;
