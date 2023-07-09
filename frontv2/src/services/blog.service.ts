import axios from 'axios';
import {TypeFeed} from '@/types/api/source_blog';
import {
  BookmarkBlogRequest,
  BookmarkBlogResponse,
  GetAllBlogByPaginationForSourceBlogIdRequest,
  GetAllBlogRequest,
  GetBlogsBySearchRequest,
  GetBlogsResponse,
  GetBookmarksParams,
  GetBookmarksResponse,
  LikeBlogRequest,
  LikeBlogResponse,
} from '@/types/api/blog';
import {PaginationRequestMetaRequest} from '@/types/api/common';
import {ROOT_API_URL} from '@/services/config';

export default class BlogService {
  private endpointBlog = `${ROOT_API_URL}/blogs`;

  private static instance = new BlogService();

  public static getInstance(): BlogService {
    return this.instance;
  }

  async getAllBlogWithPagination(getAllBlogRequest: GetAllBlogRequest) {
    const res = await axios.get(this.endpointBlog, {
      params: {
        page: getAllBlogRequest.paginationRequestMeta.page,
        take: getAllBlogRequest.paginationRequestMeta.take,
      },
    });
    const data = await res.data;
    return data as GetBlogsResponse;
  }

  async getAllBlogWithPaginationAndTypeFeed(
    paginationRequest: PaginationRequestMetaRequest,
    feedType: TypeFeed,
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

  async likeBlog(request: LikeBlogRequest) {
    const res = await axios.post(
      `${this.endpointBlog}/like`,
      {
        blogId: request.blogId,
        isLiked: request.isLiked,
      },
      {
        headers: {
          Authorization: `Bearer ${request.accessToken}`,
        },
      },
    );

    const data = await res.data;
    return data as LikeBlogResponse;
  }

  async getAllBlogWithPaginationWithAuth(getAllBlogRequest: GetAllBlogRequest) {
    const res = await axios.get(`${this.endpointBlog}/all/with-auth`, {
      params: {
        page: getAllBlogRequest.paginationRequestMeta.page,
        take: getAllBlogRequest.paginationRequestMeta.take,
      },
      headers: {
        Authorization: `Bearer ${getAllBlogRequest.accessToken}`,
      },
    });

    const data = await res.data;
    return data as GetBlogsResponse;
  }

  async bookmarkBlog(request: BookmarkBlogRequest) {
    const res = await axios.post(
      `${this.endpointBlog}/bookmark`,
      {
        blogId: request.blogId,
        isBookmarked: request.isBookmarked,
      },
      {
        headers: {
          Authorization: `Bearer ${request.accessToken}`,
        },
      },
    );

    const data = await res.data;
    return data as BookmarkBlogResponse;
  }

  async getBookmarks(request: GetBookmarksParams) {
    const res = await axios.get(`${this.endpointBlog}/bookmark/all`, {
      params: {
        dateLastBlogList: request.dateLastBlogList,
        page: 1, // just to bleufe
      },
      headers: {
        Authorization: `Bearer ${request.accessToken}`,
      },
    });

    const data = await res.data;
    return data as GetBookmarksResponse;
  }

  async getAllBlogWithPaginationAndSourceBlog(
    request: GetAllBlogByPaginationForSourceBlogIdRequest,
  ) {
    const response = await axios.get(`${this.endpointBlog}/all/sourceblog`, {
      params: {
        pageOption: {
          page: request.paginationRequestMeta.page,
          take: request.paginationRequestMeta.take,
        },
        sourceBlogId: request.sourceBlogId,
      },
      headers: {
        Authorization: `Bearer ${request.accessToken}`,
      },
    });

    const data = await response.data;
    return data as GetBlogsResponse;
  }

  async getAllBySearch(request: GetBlogsBySearchRequest) {
    const response = await axios.post(
      `${this.endpointBlog}/search`,
      {},
      {
        params: {
          pageOption: {
            page: request.paginationRequestMeta.page,
            take: request.paginationRequestMeta.take,
          },
          text: request.text,
        },
        headers: {
          Authorization: `Bearer ${request.accessToken}`,
        },
      },
    );
    const data = await response.data;
    return data as GetBlogsResponse;
  }
}
