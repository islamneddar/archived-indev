'use client'

import BlogList from "./BlogList";
import {useEffect, useState} from "react";
import {TypeFeed} from "../../proto/source_blog";
import {LocalstorageUtil} from "../../utils/localstorage.util";
import {localStorageKey} from "../../data/localstorage.data";


function BlogsBody() {
    //const [typeFeed, setTypeFeed] = useLocalStorage(localStorageKey.TYPE_FEED_KEY, TypeFeed.COMMUNITY)
    const [typeFeed, setTypeFeed] = useState<TypeFeed>(TypeFeed.UNKOWN)

    useEffect(()=>{
        console.log(typeFeed)
        setTypeFeed(LocalstorageUtil.getLocalStorage(localStorageKey.TYPE_FEED_KEY) || TypeFeed.COMMUNITY)
    },[])

    return (
        <div className={'px-10 tn:px-2 sm:px-3 h-full flex flex-1 '}>
            <div className={"flex h-full flex-1 flex-col pt-5 justify-center"}>
                <div className={"flex flex-row w-full justify-center"}>
                    <div
                        className={`px-5 cursor-pointer ${typeFeed === TypeFeed.ORIGINAL ? "bg-white rounded text-black" : ""}`}
                        onClick={()=>{
                            setTypeFeed(TypeFeed.ORIGINAL)
                            LocalstorageUtil.setLocalStorage(localStorageKey.TYPE_FEED_KEY, TypeFeed.ORIGINAL)
                        }}
                    >
                        original
                    </div>
                    <div
                        className={`px-5 cursor-pointer ${typeFeed === TypeFeed.COMMUNITY ? "bg-white rounded text-black" : ""}`}
                        onClick={()=>{
                            setTypeFeed(TypeFeed.COMMUNITY)
                            LocalstorageUtil.setLocalStorage(localStorageKey.TYPE_FEED_KEY, TypeFeed.COMMUNITY)
                        }}
                    >
                        community
                    </div>
                </div>
                {
                    typeFeed !== TypeFeed.UNKOWN && <BlogList typeFeed={typeFeed}></BlogList>
                }
            </div>
        </div>
    );
}

export default BlogsBody;