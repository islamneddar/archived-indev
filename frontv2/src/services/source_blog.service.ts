import {ROOT_API_URL} from '@/services/config';
import axios from 'axios';
import {
  FollowSourceBlogRequest,
  FollowSourceBlogResponse,
  GetAllSourceBlogRequest,
  GetAllSourceBlogResponse,
} from '@/types/api/source_blog';

export default class SourceBlogService {
  private endpointSourceBlog = `${ROOT_API_URL}/source-blog`;

  private static instance = new SourceBlogService();

  public static getInstance(): SourceBlogService {
    return this.instance;
  }

  async getAllSourceBlogWithPagination(
    getAllSourceBlogRequest: GetAllSourceBlogRequest,
  ) {
    const res = await axios.get(this.endpointSourceBlog + '/all', {
      params: {
        page: getAllSourceBlogRequest.paginationRequestMeta.page,
        take: getAllSourceBlogRequest.paginationRequestMeta.take,
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
}
