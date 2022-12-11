import {Controller, DefaultValuePipe, Get, HttpCode, HttpStatus, Logger, ParseIntPipe, Query} from '@nestjs/common';
import {BlogService} from "./blog.service";
import {IPaginationOptions} from "nestjs-typeorm-paginate";
import {PageOptionsDto} from "../../common/pagination/page_option.dto";
import {BlogByFeedTypeRequest} from "./blog.proto";
import {PageDto} from "../../common/pagination/page.dto";

@Controller('blogs')
export class BlogController {
    private readonly LOG = new Logger(BlogController.name)
    constructor(
        private blogService : BlogService
    ) {
    }

    @Get("")
    @HttpCode(HttpStatus.OK)
    async getWithPaginate(
        @Query() pageOptionsDto: PageOptionsDto
    ){
        this.LOG.debug(JSON.stringify(pageOptionsDto))
        this.LOG.debug(pageOptionsDto.skip)
        return await this.blogService.getWithPaginate(pageOptionsDto)
    }

    @Get("/by-feed-type")
    @HttpCode(HttpStatus.OK)
    async getWithPaginateByFeedType(
        @Query() getBlogsByFeedTypeRequest : BlogByFeedTypeRequest
    ){
        const pageOption = getBlogsByFeedTypeRequest.pageOption;
        const feedType = getBlogsByFeedTypeRequest.feedType;
        return await this.blogService.getWithPaginateByFeedType(pageOption, feedType)
    }
}
