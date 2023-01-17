import React from 'react';
import BlogList from "../[type]/BlogList";
import {TypeFeed} from "../../../proto/source_blog";

function BlogListSearch() {

    return (
        <BlogList typeFeed={TypeFeed.ALL} />
    );
}

export default BlogListSearch;