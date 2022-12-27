'use client'

import React, {useState} from 'react';
import {TypeFeed} from "../../proto/source_blog";
import {IoIosArrowDown} from "react-icons/all";
import {usePathname, useRouter as useNavigation} from "next/navigation";
import SideBarContent from "./SideBarContent";

function SideBareBlog() {
    return (
        <div className={'hidden md:block shadow-xl h-full w-248'}>
            <SideBarContent handleAfterClick={()=>{}}/>
        </div>
    );
}

export default SideBareBlog;