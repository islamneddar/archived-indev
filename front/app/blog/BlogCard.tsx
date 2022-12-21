'use client'
import React from 'react';
import {Blog} from "../../proto/blog";
import "./BlogCard.css"
import ReactTooltip from "react-tooltip";
import {timeSince} from "../../utils/time.util";
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';

export interface IBlogCardProps {
    blog : Blog
}


function BlogCard(props : IBlogCardProps) {
    const blog = props.blog
    const dateFormatV2 = timeSince(new Date(blog.publishDate).getTime())

    return (
        <div className={'h-80 bg-gray-700 rounded-xl cursor-pointer shadow-xl'} onClick={(event) => {
            event.stopPropagation();
            window.open(blog.permalink, '_blank', 'noopener,noreferrer');
        }}>
            <div className={'pb-2 h-full flex flex-col'}>
                <div className={'h-40'}>
                    <img src={blog.thumbnail} className={"w-full h-full rounded-xl object-fit"}/>
                </div>
                {/*<div>
                    <p className={"truncate line-clamp-1 text-12"}>{blog.sourceBlog.name}</p>
                </div>*/}

                <div className={'flex flex-col flex-1 h-full justify-between pt-3 px-5'}>
                    <div className={"flex flex-row items-center"}>
                        <div className={"flex justify-start items-center"}>
                            <img data-tip={blog.sourceBlog.name} data-for='source_blog_name' src={blog.sourceBlog.image} className={"w-7 h-7 rounded-xl "} />
                            <ReactTooltip
                                id="source_blog_name"
                                place={"top"}
                                type={"dark"}
                                effect={"float"}
                                multiline={true}
                            />
                        </div>
                        <div className={"flex justify-start items-end pl-3"}>
                            <p className={"text-12"}>{dateFormatV2} ago</p>
                        </div>
                    </div>
                    <div>
                        <p className={"line-clamp-3 font-medium cursor-pointer"} onClick={()=>{

                        }}>{blog.title}</p>
                    </div>
                    {
                        //<div className={"flex flex-wrap overflow-x-auto cursor-grab "}>
                        <ScrollMenu scrollContainerClassName={"scrollbar-hide"}>
                            {blog.tags.slice(0,3).map(tag => {
                                return (
                                    <span className={"py-1 px-1 mx-1 my-1 flex rounded-xl text-10 whitespace-nowrap text-gray-900 bg-gray-300 inline"}>{tag.title}</span>
                                )
                            })}
                        </ScrollMenu>

                        //</div>
                    }
                </div>
            </div>
        </div>
    );
}

export default BlogCard;