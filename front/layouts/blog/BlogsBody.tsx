import React from 'react';
import BlogList from "./BlogList";

function BlogsBody() {
    return (
        <div className={'px-10 h-full flex flex-1'}>
            <div className={' flex flex-1 py-5'}>
                <div className={"flex h-full flex-1"}>
                    <BlogList></BlogList>
                </div>
            </div>
        </div>
    );
}

export default BlogsBody;