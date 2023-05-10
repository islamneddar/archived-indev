'use client'

import React from 'react';
import SideBarContent from "./SideBarContent";

function SideBareBlog() {
    return (
        <div className="hidden md:block shadow-xl h-full w-248">
            <SideBarContent handleAfterClick={()=>{}}/>
        </div>
    );
}

export default SideBareBlog;