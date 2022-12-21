'use client'

import React, {useState} from 'react';
import {TypeFeed} from "../../proto/source_blog";
import {IoIosArrowDown} from "react-icons/all";
import {usePathname, useRouter as useNavigation} from "next/navigation";


const navigationTabs = [
    TypeFeed.COMMUNITY,
    TypeFeed.ORIGINAL,
    TypeFeed.NEWS
]

function SideBareBlog() {
    const [openedCategory, setOpenedCategory] = useState<boolean>(true)
    const navigation = useNavigation()
    const pathname = usePathname()

    console.log(pathname)

    function openCategory() {
        setOpenedCategory(!openedCategory)
    }

    return (
        <div className={'hidden md:block flex-1 shadow-xl h-full'}>
            <div className={"overflow-y-scroll pt-10 px-10"}>
                <div className={'py-3 flex flex-row cursor-pointer'} onClick={openCategory}>
                    <span>Category</span>
                    <div className={'flex justify-center items-center pl-2'}>
                        <IoIosArrowDown/>
                    </div>
                </div>
                <div className={`${openedCategory ? "" : "hidden"}`}>
                    {
                        navigationTabs.map((value, index)=>{
                            return (
                                <div key={index} className={"py-2 px-5 cursor-pointer"} onClick={()=>{
                                    navigation.push("/blog/"+value)
                                }}>
                                    <p className={`${pathname === "/blog/"+value ? "white" : "text-gray-500" }`}>{value.toUpperCase()}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default SideBareBlog;