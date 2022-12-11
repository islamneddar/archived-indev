'use client'
import BlogList from "./BlogList";
import {useState} from "react";
import {TypeFeed} from "../../proto/source_blog";

function BlogsBody() {

    const [typeFeed, setTypeFeed] = useState<TypeFeed>(TypeFeed.ORIGINAL)

    return (
        <div className={'px-10 h-full flex flex-1 '}>
            <div className={"flex h-full flex-1 flex-col py-10 justify-center"}>
                <div className={"flex flex-row w-full justify-center"}>
                    <div
                        className={`px-5 cursor-pointer ${typeFeed === TypeFeed.ORIGINAL ? "bg-white rounded text-black" : ""}`}
                        onClick={()=>{
                            setTypeFeed(TypeFeed.ORIGINAL)
                        }}
                    >
                        original
                    </div>
                    <div
                        className={`px-5 cursor-pointer ${typeFeed === TypeFeed.COMMUNITY ? "bg-white rounded text-black" : ""}`}
                        onClick={()=>{
                            setTypeFeed(TypeFeed.COMMUNITY)
                        }}
                    >
                        community
                    </div>
                </div>
                <BlogList typeFeed={typeFeed}></BlogList>
            </div>
        </div>
    );
}

export default BlogsBody;