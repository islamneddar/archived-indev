import BlogsBody from "./BlogsBody";

export default function Page() {
    return (
        <div className={"bg-secondary h-[calc(100vh_-_96px)]"}>
            <div className={'flex flex-col h-full'}>
                <BlogsBody></BlogsBody>
            </div>
        </div>
    )
}
