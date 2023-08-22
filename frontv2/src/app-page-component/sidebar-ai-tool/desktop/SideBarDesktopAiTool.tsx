import React from 'react';
import {SideBarDesktopProps} from '@/app-page-component/sidebar/SideBarMain';
import SideBarItemAiTool from '@/app-page-component/sidebar-ai-tool/desktop/SideBarItemAiTool';
import SideBarProfileSectionAiTool from '@/app-page-component/sidebar-ai-tool/desktop/SideBarProfileSectionAiTool';
import FooterSideBarAiTool from '@/app-page-component/sidebar-ai-tool/desktop/FooterSideBarAiTool';

export default function SideBarDesktopAiTool(props: SideBarDesktopProps) {
  return (
    <div className="hidden md:fixed md:bottom-0 md:top-24 md:flex md:w-64 md:flex-col shadow-xl">
      {/* Sidebar component, swap this element with another sidebar if you like */}
      <div className="flex min-h-0 flex-1 flex-col ">
        <div className="flex flex-1 flex-col overflow-y-auto  pb-4">
          <nav className="mt-5 flex-1 space-y-1 px-2">
            {props.navigation.map(item => {
              return (
                <SideBarItemAiTool
                  key={item.name}
                  item={item}></SideBarItemAiTool>
              );
            })}
          </nav>
        </div>
      </div>
      <SideBarProfileSectionAiTool></SideBarProfileSectionAiTool>
      <FooterSideBarAiTool></FooterSideBarAiTool>
    </div>
  );
}
