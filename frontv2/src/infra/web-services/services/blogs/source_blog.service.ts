import {ROOT_API_URL} from '@/infra/web-services/config';
import axios from 'axios';
import {
  FollowSourceBlogRequest,
  FollowSourceBlogResponse,
  GetAllSourceBlogRequest,
  GetAllSourceBlogResponse,
  GetAllTypeSourceBlogRequest,
  GetAllTypeSourceBlogResponse,
} from '@/infra/web-services/types/blogs/source_blog';

export default class SourceBlogService {
  private endpointSourceBlog = `${ROOT_API_URL}/source-blog`;

  private static instance = new SourceBlogService();

  public static getInstance(): SourceBlogService {
    return this.instance;
  }

  async getAllSourceBlogWithPagination(
    getAllSourceBlogRequest: GetAllSourceBlogRequest,
  ) {
    const res = await axios.get(this.endpointSourceBlog + '/all_by_type', {
      params: {
        page: getAllSourceBlogRequest.paginationRequestMeta.page,
        take: getAllSourceBlogRequest.paginationRequestMeta.take,
        typeSource: getAllSourceBlogRequest.sourceBlogType,
      },
      headers: {
        Authorization: `Bearer ${getAllSourceBlogRequest.accessToken}`,
      },
    });
    const data = await res.data;
    return data as GetAllSourceBlogResponse;
  }

  async followSourceBlog(request: FollowSourceBlogRequest) {
    const res = await axios.post(
      `${this.endpointSourceBlog}/follow`,
      {
        sourceBlogId: request.sourceBlogId,
        isFollow: request.isFollow,
      },
      {
        headers: {
          Authorization: `Bearer ${request.accessToken}`,
        },
      },
    );
    const data = await res.data;
    return data as FollowSourceBlogResponse;
  }

  async getAllTypesSourceBlog(request: GetAllTypeSourceBlogRequest) {
    const res = await axios.get(`${this.endpointSourceBlog}/all-types`, {
      headers: {
        Authorization: `Bearer ${request.accessToken}`,
      },
    });
    const data = await res.data;
    return data as GetAllTypeSourceBlogResponse;
  }
}
