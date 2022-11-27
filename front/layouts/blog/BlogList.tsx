import React from 'react';
import {GetBlogsResponse} from "../../model_interfaces/blog";

export interface BlogListProps {
    scrollId: string;
    blogs: GetBlogsResponse;
    hasMore: boolean;
}

function BlogList() {
    return (
        <div className={'grid grid-cols-4 gap-4'}>

        </div>
    );
}

export default BlogList;