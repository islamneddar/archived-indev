import axios from "axios";
import { PaginationRequestMeta } from "../proto/common";
import { TypeFeed } from "../proto/source_blog";

export default class BlogService {
  private endpointBlog = `${process.env.NEXT_PUBLIC_API_URL}/blogs`;

  private static instance = new BlogService();

  public static getInstance(): BlogService {
    return this.instance;
  }

  async getAllBlogWithPagination(paginationRequest: PaginationRequestMeta) {
    return axios.get(this.endpointBlog, {
      params: {
        page: paginationRequest.page,
        take: paginationRequest.take,
      },
    });
  }

  async getAllBlogWithPaginationAndTypeFeed(
    paginationRequest: PaginationRequestMeta,
    feedType: TypeFeed
  ) {
    return axios.get(`${this.endpointBlog}/by-feed-type`, {
      params: {
        pageOption: {
          page: paginationRequest.page,
          take: paginationRequest.take,
        },
        feedType,
      },
    });
  }
}
