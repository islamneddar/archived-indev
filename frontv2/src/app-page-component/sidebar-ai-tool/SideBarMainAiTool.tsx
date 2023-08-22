import React from 'react';
import {NavigationType} from '@/types/general/sidebar.type';
import SideBarDesktopAiTool from '@/app-page-component/sidebar-ai-tool/desktop/SideBarDesktopAiTool';
import SideBarMobile from '@/app-page-component/sidebar/mobile/SideBarMobile';

export interface SideBarDesktopProps {
  navigation: NavigationType[];
}
function SideBarMainAiTool(props: SideBarDesktopProps) {
  return (
    <>
      <div>
        <SideBarDesktopAiTool
          navigation={props.navigation}></SideBarDesktopAiTool>
      </div>
      <div>
        <SideBarMobile navigation={props.navigation}></SideBarMobile>
      </div>
    </>
  );
}

export default SideBarMainAiTool;
