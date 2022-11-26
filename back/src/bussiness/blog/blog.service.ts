import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {BlogEntity} from "./blog.entity";
import {Repository} from "typeorm";

@Injectable()
export class BlogService {

    constructor(
        @InjectRepository(BlogEntity)
        private blogRepository : Repository<BlogEntity>
    ) {
    }

    async getByTitle(titleFeed: string) {
        return await this.blogRepository.findOne({
            where : {
                title : titleFeed
            }
        });
    }

    async getOrCreate(blog: BlogEntity) {
        const existedBlog = await this.getByTitleAndSourceBlog(blog.title,blog.sourceBlog.sourceBlogId)
        if(!existedBlog){
            const blogToAdd = {
                ...blog
            }
            if (blog.sourceBlog !== undefined) {
                blogToAdd.sourceBlog.sourceBlogId = blog.sourceBlog.sourceBlogId;
            }

            return this.blogRepository.save({
                ...blogToAdd
            });
        }
        return existedBlog
    }

    async getByTitleAndSourceBlog(blogTitle: string, sourceBlogId : number){
        return this.blogRepository.findOne({
            where : {
                title : blogTitle,
                sourceBlog : {
                    sourceBlogId : sourceBlogId
                }
            }
        })
    }
}
