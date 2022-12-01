import BlogList from "./BlogList";

async function BlogsBody() {
    return (
        <div className={'px-10 h-full flex flex-1 '}>
            <div className={"flex h-full flex-1 py-10"}>
                <BlogList></BlogList>
            </div>
        </div>
    );
}

export default BlogsBody;