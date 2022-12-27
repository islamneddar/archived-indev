'use client'

import React, {useState} from 'react';
import {TypeFeed} from "../../proto/source_blog";
import {IoIosArrowDown} from "react-icons/all";
import {usePathname, useRouter as useNavigation} from "next/navigation";
import SideBarContent from "./SideBarContent";




function SideBareBlog() {
    return (
        <div className={'hidden md:block flex-1 shadow-xl h-full'}>
            <SideBarContent handleAfterClick={()=>{}}/>
        </div>
    );
}

export default SideBareBlog;