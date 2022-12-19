
import NavBar from "../../layouts/NavBar";
import BlogsBody from "./BlogsBody";

export default function Page() {
    return (
        <div className={"bg-secondary h-screen"}>
            <div className={'flex flex-col h-full'}>
                <BlogsBody></BlogsBody>
            </div>
        </div>
    )
}
