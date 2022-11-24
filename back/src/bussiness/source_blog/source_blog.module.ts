import { Module } from '@nestjs/common';
import {SourceBlogController} from "./source_blog.controller";
import {SourceBlogService} from "./source_blog.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {SourceBlogEntity} from "./source_blog.entity";

@Module({
    imports: [TypeOrmModule.forFeature([SourceBlogEntity])],
    controllers : [SourceBlogController],
    providers : [SourceBlogService],
    exports: [SourceBlogService]
})
export class SourceBlogModule {}
