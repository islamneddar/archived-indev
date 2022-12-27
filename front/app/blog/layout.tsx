import BlogsBody from "./[type]/BlogsBody";
import SideBareBlog from "./SideBareBlog";
import SideBarMobile from "./SideBarMobile";
import Head from "next/head";
import {Fragment} from "react";

export default function Layout({
                                   children,
                               }: {
    children: React.ReactNode
}) {
    return (
        <Fragment>
            <div className={"bg-secondary h-[calc(100vh_-_96px)]"}>
                <div className={'flex flex-row flex-6 h-full'}>
                    <SideBareBlog></SideBareBlog>
                    <SideBarMobile></SideBarMobile>
                    <div className={'flex md:flex-5 w-full'}>
                        {children}
                    </div>
                </div>
            </div>
        </Fragment>

    )
}
