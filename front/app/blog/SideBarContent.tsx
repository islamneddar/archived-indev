'use client'

import React, {useState} from 'react';
import {IoIosArrowDown} from "react-icons/all";
import {TypeFeed} from "../../proto/source_blog";
import {useRouter as useNavigation} from "next/dist/client/components/navigation";
import {usePathname} from "next/navigation";
import SimpleToggleInnom from "../../components/innoom/SimpleToggleInnoom";
import {dispatch} from "react-hot-toast/src/core/store";
import {useDispatch} from "react-redux";
import {toggleSearch} from "../../redux/system.slice";
import {mySelectors} from "../../redux/selectors";

const navigationTabs = [
    TypeFeed.COMMUNITY,
    TypeFeed.ORIGINAL,
    TypeFeed.NEWS,
    TypeFeed.DESIGN,
    TypeFeed.DATASCIENCE,
    TypeFeed.DEVOPS
]

interface SideBarContentProps {
    handleAfterClick: () => void
}


function SideBarContent(props: SideBarContentProps) {
    const [openedCategory, setOpenedCategory] = useState<boolean>(true)

    const system = mySelectors().system

    const navigation = useNavigation()
    const pathname = usePathname()
    const dispatch = useDispatch()

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
                    navigationTabs.map((value, index) => {
                        return (
                            <div key={index} className={"py-2 px-5 cursor-pointer"} onClick={() => {
                                props.handleAfterClick()
                                navigation.push("/blog/" + value)
                                dispatch(toggleSearch(false))
                            }}>
                                <p className={`${pathname === "/blog/" + value ? "white" : "text-gray-500"}`}>{value.toUpperCase()}</p>
                            </div>
                        )
                    })
                }
            </div>
            <div className={'py-5 flex flex-row justify-between items-center'}>
                <p>Search</p>
                <SimpleToggleInnom
                    setEnabled={()=>{
                        dispatch(toggleSearch(!system.searchEnabled))
                    }}
                    switchEnabled={system.searchEnabled}
                    classNameContainer={""}
                    classNamePoint={""}
                    whenSwitchEnabled={() => {
                        navigation.push("/blog/search")
                    }}
                    whenSwitchDisabled={() => {
                        navigation.back()
                    }}/>
            </div>
        </div>
    );
}

export default SideBarContent;