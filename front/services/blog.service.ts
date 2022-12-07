import axios from "axios";
import {PaginationRequestMeta} from "../proto/common";

export class BlogService {

    private endpointBlog = `https://indev-back-gcnve.ondigitalocean.app/blogs`;


    private static instance = new BlogService();

    public static getInstance(): BlogService {
        return this.instance;
    }

    async getAllBlogWithPagination(paginationRequest: PaginationRequestMeta)  {
        return await axios.get(this.endpointBlog, {
            params: {
                page: paginationRequest.page,
                take: paginationRequest.take
            }
        })
    }
}