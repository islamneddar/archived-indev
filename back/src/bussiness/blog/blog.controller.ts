import {
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Logger,
  Query,
} from '@nestjs/common';
import {BlogService} from './blog.service';
import {PageOptionsDto} from '../../common/pagination/page_option.dto';
import {
  BlogByFeedTypeRequest,
  GetBlogBySearchAndFeedTypeRequest,
  GetBlogBySearchRequest,
} from './blog.proto';

@Controller('blogs')
export default class BlogController {
  private readonly LOG = new Logger(BlogController.name);

  constructor(private blogService: BlogService) {}

  @Get('')
  @HttpCode(HttpStatus.OK)
  async getWithPaginate(@Query() pageOptionsDto: PageOptionsDto) {
    this.LOG.debug(JSON.stringify(pageOptionsDto));
    this.LOG.debug(pageOptionsDto.skip);
    return this.blogService.getWithPaginate(pageOptionsDto);
  }

  @Get('/by-feed-type')
  @HttpCode(HttpStatus.OK)
  async getWithPaginateByFeedType(
    @Query() getBlogsByFeedTypeRequest: BlogByFeedTypeRequest,
  ) {
    const {pageOption} = getBlogsByFeedTypeRequest;
    const {feedType} = getBlogsByFeedTypeRequest;
    return this.blogService.getWithPaginateByFeedType(pageOption, feedType);
  }

  /**
   * @deprecated
   */
  @Get('/deprecated/search')
  async getBlogsWithSearch(@Query() getBlogBySearch: GetBlogBySearchRequest) {
    this.LOG.debug(getBlogBySearch.search);
    const {pageOption} = getBlogBySearch;
    const {search} = getBlogBySearch;
    return this.blogService.getWithPaginateBySearch(pageOption, search);
  }

  @Get('/search')
  async getBlogWithSearchAndType(
    @Query() getBlogRequest: GetBlogBySearchAndFeedTypeRequest,
  ) {
    this.LOG.debug('get blog with search and type');
    const {pageOption} = getBlogRequest;
    const {search} = getBlogRequest;
    const {feedType} = getBlogRequest;
    if (pageOption === undefined) {
      throw new HttpException(
        'Argument Failed',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    if (search === undefined || search === null || search.length === 0) {
      throw new HttpException(
        'search query is empty',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return this.blogService.getAllPaginateWithSearchAndFeedType(
      pageOption,
      search,
      feedType,
    );
  }
}
