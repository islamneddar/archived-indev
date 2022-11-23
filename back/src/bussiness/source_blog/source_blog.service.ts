import { Injectable } from '@nestjs/common';
import {SourceBlogEntity} from "./source_blog.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class SourceBlogService {
    constructor(
        @InjectRepository(SourceBlogEntity)
        private sourceBlogRepository : Repository<SourceBlogEntity>
    ) {}

    create(sourceBlog : SourceBlogEntity){
        this.sourceBlogRepository.create(sourceBlog)
    }

    findAll() : Promise<SourceBlogEntity[]>{
        return this.sourceBlogRepository.find()
    }
}
