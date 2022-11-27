import {Injectable, Logger} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {BlogEntity} from "./blog.entity";
import {Repository} from "typeorm";
import {PageOptionsDto} from "../../common/pagination/page_option.dto";
import {PageMetaDto} from "../../common/pagination/page_meta.dto";
import {PageDto} from "../../common/pagination/page.dto";

@Injectable()
export class BlogService {
    private readonly logger = new Logger(BlogService.name);
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

    async getWithPaginate(pageOptionsDto: PageOptionsDto) {
        const query = this.blogRepository
            .createQueryBuilder("blog")
            .leftJoinAndSelect("blog.sourceBlog", "sourceBlog")
            .leftJoinAndSelect("blog.tags", "tag")
            .select(["blog", "sourceBlog.name", "sourceBlog.image", "tag.title"])
            .orderBy("blog.publishDate", pageOptionsDto.order)
            .skip(pageOptionsDto.skip)
            .take(pageOptionsDto.take);

        const itemCount = await query.getCount();
        const {entities} = await query.getRawAndEntities();

        const pageMetaDto = new PageMetaDto({itemCount, pageOptionsDto});
        return new PageDto(entities, pageMetaDto)
    }
}
