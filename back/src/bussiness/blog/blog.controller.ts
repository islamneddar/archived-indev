import {Controller, DefaultValuePipe, Get, HttpCode, HttpStatus, Logger, ParseIntPipe, Query} from '@nestjs/common';
import {BlogService} from "./blog.service";
import {IPaginationOptions} from "nestjs-typeorm-paginate";
import {PageOptionsDto} from "../../common/pagination/page_option.dto";

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
        return await this.blogService.getWithPaginate(pageOptionsDto)
    }
}
