'use client'
import React, {useEffect, useState} from 'react';
import {BlogService} from "../../services/blog.service";
import {Order, PageMeta, PaginationRequestMeta} from "../../proto/common";
import {Blog, GetBlogsResponse} from "../../proto/blog";
import BlogCard from "./BlogCard";
import InfiniteScroll from "react-infinite-scroll-component";


function BlogList() {
    const [page, setPage] = useState<number>(1)
    const [blogs, setBlogs] = useState<Blog[]>([])
    const [metaPageBlog, setMetaPageBlog] = useState<PageMeta>({
        page : 1,
        take : 4,
        hasNextPage : true,
        hasPreviousPage : false,
        pageCount : 1,
        itemCount : 0,
    })
    useEffect(() => {
        async function getBlogs() {
            await fetchBlogs();
        }
        getBlogs()
    }, [])

    const fetchBlogs = async () => {
        const paginationRequest: PaginationRequestMeta = {
            page: page,
            take: 12,
            order : Order.DESC
        }
        const res = await BlogService.getInstance().getAllBlogWithPagination(paginationRequest)
        const blogsFetched = res.data as GetBlogsResponse;
        console.log(blogsFetched)
        const currentBlogs = [...blogs];
        currentBlogs.push(...blogsFetched.data)
        setBlogs(currentBlogs)
        setMetaPageBlog(blogsFetched.meta)
        setPage(page+1)
    }

    return (
        <div className={'px-20 w-full'}>
            <div id={"scrollBlogId"} className={'overflow-y-auto max-h-[calc(100vh_-_176px)] scrollbar-hide'}>
                <div className={"w-full flex justify-center items-center py-10"}>
                    <h2 className={"text-3xl"}>The latest Blogs in the Tech Industry for developers</h2>
                </div>
                <InfiniteScroll
                    next={fetchBlogs}
                    hasMore={metaPageBlog?.hasNextPage}
                    loader={<div>Loading ...</div>}
                    dataLength={blogs.length}
                    scrollableTarget={"scrollBlogId"}
                    scrollThreshold={0.5}
                >
                    <div className={'grid grid-cols-4 gap-4'}>
                        {blogs.map((blog) => {
                            return (
                                <div key={blog.blogId}>
                                    <BlogCard
                                        blog={blog}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </InfiniteScroll>
            </div>
        </div>

    );
}

export default BlogList;