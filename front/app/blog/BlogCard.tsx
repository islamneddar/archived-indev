'use client'
import React from 'react';
import {Blog} from "../../proto/blog";
import dayjs from "dayjs";
import "./BlogCard.css"

export interface IBlogCardProps {
    blog : Blog
}


function BlogCard(props : IBlogCardProps) {
    const blog = props.blog
    const date = dayjs(new Date(blog.publishDate))
    const dateFormat = `${date.year()}-${date.month()+1}-${date.date()}`
    console.log(blog.tags)
    return (
        <div className={'h-80 bg-gray-700 rounded-xl'}>
            <div className={'px-5 py-2 h-full flex flex-col'}>
                <div>
                    <p className={"truncate line-clamp-1 text-12"}>{blog.sourceBlog.name}</p>
                </div>
                <div className={'h-32 py-2'}>
                    <img src={blog.thumbnail} className={"w-full h-full rounded-xl object-cover"}/>
                </div>
                <div className={'flex flex-col flex-1 h-full justify-between pt-2'}>
                    <div className={"flex flex-row items-center"}>
                        <div className={"flex justify-start items-center"}>
                            <img src={blog.sourceBlog.image} className={"w-7 h-7 rounded-xl"}/>
                        </div>
                        <div className={"flex justify-start items-end pl-3"}>
                            <p className={"text-12"}>{dateFormat}</p>
                        </div>
                    </div>
                    <div>
                        <p className={"line-clamp-3 font-medium"}>{blog.title}</p>
                    </div>
                    <div className={"flex flex-wrap overflow-x-auto cursor-grab "}>
                        {blog.tags.map(tag => {
                            return (
                                <span className={"py-1 px-1 mx-1 my-1 flex rounded-xl text-10 whitespace-nowrap text-gray-900 bg-gray-300 inline"}>{tag.title}</span>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BlogCard;