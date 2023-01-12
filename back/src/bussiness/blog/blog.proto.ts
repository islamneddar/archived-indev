import {PageOptionsDto} from "../../common/pagination/page_option.dto";
import {TypeFeed} from "../feed_blog/feed_blog.entity";

export interface BlogByFeedTypeRequest{
    pageOption : PageOptionsDto,
    feedType : TypeFeed
}

export interface GetBlogBySearchRequest {
    pageOption : PageOptionsDto,
    search : string
}