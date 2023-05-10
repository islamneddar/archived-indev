import React from 'react';
import BlogListSearch from "./BlogListSearch";

function Page() {
    return (
        <div className={'px-10 tn:px-2 sm:px-3 h-full flex flex-1 '}>
            <div className={"flex h-full flex-1 flex-col pt-5 justify-center"}>
                {
                    <BlogListSearch></BlogListSearch>
                }
            </div>
        </div>
    );
}

export default Page;