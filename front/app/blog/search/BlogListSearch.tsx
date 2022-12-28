import React from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import BlogCard from "../[type]/BlogCard";

function BlogListSearch() {



    return (
        <div className={'md:px-5 lg:px-20 pt-5 w-full'}>
            <div id={"scrollBlogId"} className={'overflow-y-auto h-[calc(100vh_-_136px)] sm:scrollbar-hide'}>
                <div className={"w-full flex justify-center items-center py-10 text-center"}>
                    <h2 className={"text-3xl text-center"}>search</h2>
                </div>
                <InfiniteScroll
                    next={() => fetchBlogs(false)}
                    hasMore={metaPageBlog?.hasNextPage}
                    loader={<div>Loading ...</div>}
                    dataLength={blogs.length}
                    scrollableTarget={"scrollBlogId"}
                    scrollThreshold={0.8}
                >
                    <div className={'grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4'}>
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

export default BlogListSearch;