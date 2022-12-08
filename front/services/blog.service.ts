import axios from "axios";
import {PaginationRequestMeta} from "../proto/common";

export class BlogService {

    private endpointBlog = `${process.env.NEXT_PUBLIC_API_URL}/blogs`;


    private static instance = new BlogService();

    public static getInstance(): BlogService {

        return this.instance;
    }

    async getAllBlogWithPagination(paginationRequest: PaginationRequestMeta)  {
        console.log(this.endpointBlog)
        return await axios.get(this.endpointBlog, {
            params: {
                page: paginationRequest.page,
                take: paginationRequest.take
            }
        })
    }
}