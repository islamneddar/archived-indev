import BlogsBody from "./[type]/BlogsBody";
import SideBareBlog from "./SideBareBlog";

export default function Layout({
                                   children,
                               }: {
    children: React.ReactNode
}) {
    return (
        <div className={"bg-secondary h-[calc(100vh_-_96px)]"}>
            <div className={'flex flex-row flex-6 h-full'}>
                <SideBareBlog></SideBareBlog>
                <div className={'flex md:flex-5 w-full'}>
                    {children}
                </div>
            </div>

        </div>
    )
}
