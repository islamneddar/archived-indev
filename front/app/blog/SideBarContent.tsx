'use client'

import React, {useState} from 'react';
import {IoIosArrowDown} from "react-icons/all";
import {TypeFeed} from "../../proto/source_blog";
import {useRouter as useNavigation} from "next/dist/client/components/navigation";
import {usePathname} from "next/navigation";

const navigationTabs = [
    TypeFeed.COMMUNITY,
    TypeFeed.ORIGINAL,
    TypeFeed.NEWS,
    TypeFeed.DESIGN,
    TypeFeed.DATASCIENCE,
]

interface SideBarContentProps {
    handleAfterClick : () => void
}


function SideBarContent(props : SideBarContentProps) {
    const [openedCategory, setOpenedCategory] = useState<boolean>(true)

    const navigation = useNavigation()
    const pathname = usePathname()

    function openCategory() {
        setOpenedCategory(!openedCategory)
    }
    return (
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
                                props.handleAfterClick()
                                navigation.push("/blog/"+value)
                            }}>
                                <p className={`${pathname === "/blog/"+value ? "white" : "text-gray-500" }`}>{value.toUpperCase()}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default SideBarContent;