'use client'
import React from 'react';
import {Blog} from "../../proto/blog";

export interface IBlogCardProps {
    blog : Blog
}


function BlogCard(props : IBlogCardProps) {
    return (
        <div className={'h-96 bg-red-400'}>
            {props.blog.title}
        </div>
    );
}

export default BlogCard;