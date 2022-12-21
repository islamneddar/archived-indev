import React from 'react';
import BlogsBody from "./BlogsBody";
import {TypeFeed} from "../../../proto/source_blog";

interface IBlogBodyTypeProps{
    params : {
        type : string
    }
}

function Page(props : IBlogBodyTypeProps) {
    return (
        <div className={" w-full"}>
            <BlogsBody type={props.params.type as TypeFeed}></BlogsBody>
        </div>
    );
}

export default Page;