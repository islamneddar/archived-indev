'use client';
import React, {useEffect, useState} from 'react';
import {
  Order,
  PageMetaResponse,
  PaginationRequestMetaRequest,
} from '@/types/api/common';
import {TypeFeed} from '@/types/api/source_blog';
import {useDispatch} from 'react-redux';
import {getAllBlogThunk} from '@/redux/slices/blog/api/get-all-blog/blog.thunk';
import {useBlogSelector} from '@/redux/slices/blog/api/get-all-blog/blog.selector';
import InfiniteScroll from 'react-infinite-scroll-component';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {
  BlogAffichageType,
  GridBlogType,
} from '@/types/general/blog-general.type';
import BlogsCardLists from '@/app-page-component/blog-section/blogs/BlogsCardLists';
import {
  Blog,
  GetAllBlogByPaginationForSourceBlogIdRequest,
} from '@/types/api/blog';
import {useLikeBlogSelector} from '@/redux/slices/blog/api/like-blog/like-blog.selector';
import {resetBlogState} from '@/redux/slices/blog/api/get-all-blog/blog.slice';
import {resetLikeBlogState} from '@/redux/slices/blog/api/like-blog/like-blog.slice';
import toast from 'react-hot-toast';
import {useUserSessionSelector} from '@/redux/slices/auth/user/user.selector';
import {useBookmarkBlogSelector} from '@/redux/slices/blog/api/bookmark-blog/bookmark-blog.selector';
import {resetBookmarkBlogState} from '@/redux/slices/blog/api/bookmark-blog/bookmark-blog.slice';
import ContainerForFilterGetDataAndGridType from '@/app-page-component/blog-section/blogs/ContainerForFilterGetDataAndGridType';
import {getAllBlogBySourceBlogRequestThunk} from '@/redux/slices/blog/api/get-all-blog-by-source/get-all-blog-by-source.thunk';
import {useGetBlogsBySourceBlogSelector} from '@/redux/slices/blog/api/get-all-blog-by-source/get-all-blog-by-source.selector';
import {resetBlogBySourceBlogState} from '@/redux/slices/blog/api/get-all-blog-by-source/get-all-blog-by-source.slice';

export interface IBlogListProps {
  typeFeed?: TypeFeed;
  showContainerOfGridAndFilter: boolean;
  gridToShow: GridBlogType;
  showAd: boolean;
  ForSpecificSourceBlog: number | null; // sourceblog id
}

function BlogList(props: IBlogListProps) {
  const dispatchThunk = useDispatch<ThunkDispatch<any, any, any>>();
  const dispatch = useDispatch();
  const userSessionSelector = useUserSessionSelector();

  const blogSelector = useBlogSelector();
  const likeBlogSelector = useLikeBlogSelector();
  const bookmarkBlogSelector = useBookmarkBlogSelector();
  const blogsBySourceBlogSelector = useGetBlogsBySourceBlogSelector();

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [metaData, setMetaData] = useState<PageMetaResponse>({
    page: 1,
    hasPreviousPage: false,
    hasNextPage: false,
  });
  const [page, setPage] = useState<number>(1);
  const [restart, setRestart] = useState<boolean>(true);
  const [stateGrid, setStateGrid] = useState<GridBlogType>(props.gridToShow);
  const [stateAffichage, setStateAffichage] = useState<BlogAffichageType>(
    BlogAffichageType.LATEST,
  );

  const fetchBlogs = async (restart: boolean) => {
    const paginationRequest: PaginationRequestMetaRequest = {
      page: page,
      take: 12,
      order: Order.DESC,
    };

    const getAllBlogRequest = {
      paginationRequestMeta: paginationRequest,
      accessToken:
        userSessionSelector.isAuthenticated &&
        userSessionSelector.user.accessToken
          ? userSessionSelector.user.accessToken
          : null,
    };

    dispatchThunk(getAllBlogThunk(getAllBlogRequest));
    if (restart) {
      setRestart(false);
    }
  };

  async function fetchBlogsForSpecificSourceBlog(param: {
    restart: boolean;
    sourceBlogId: number;
  }) {
    const paginationRequest: PaginationRequestMetaRequest = {
      page: page,
      take: 12,
      order: Order.DESC,
    };

    const getAllBlogBySourceBlogRequest: GetAllBlogByPaginationForSourceBlogIdRequest =
      {
        paginationRequestMeta: paginationRequest,
        accessToken:
          userSessionSelector.isAuthenticated &&
          userSessionSelector.user.accessToken
            ? userSessionSelector.user.accessToken
            : null,
        sourceBlogId: param.sourceBlogId,
      };

    dispatchThunk(
      getAllBlogBySourceBlogRequestThunk(getAllBlogBySourceBlogRequest),
    );
    if (param.restart) {
      setRestart(false);
    }
  }

  useEffect(() => {
    async function getBlogs() {
      if (props.ForSpecificSourceBlog) {
        await fetchBlogsForSpecificSourceBlog({
          sourceBlogId: props.ForSpecificSourceBlog,
          restart,
        });
      } else {
        await fetchBlogs(restart);
      }
    }

    if (restart && page === 1) {
      getBlogs();
    }
  }, [restart]);

  useEffect(() => {
    if (blogSelector.success) {
      if (blogSelector.data) {
        setBlogs([...blogs, ...blogSelector.data.data]);
        setMetaData(blogSelector.data.meta);
        setPage(page + 1);
        dispatch(resetBlogState());
      }
    }

    if (blogSelector.error !== undefined) {
      dispatch(resetBlogState());
      return;
    }
  }, [blogSelector.success, blogSelector.error]);

  useEffect(() => {
    if (blogsBySourceBlogSelector.success) {
      if (blogsBySourceBlogSelector.data) {
        setBlogs([...blogs, ...blogsBySourceBlogSelector.data.data]);
        setMetaData(blogsBySourceBlogSelector.data.meta);
        setPage(page + 1);
        dispatch(resetBlogBySourceBlogState());
      }
    }

    if (blogsBySourceBlogSelector.error !== undefined) {
      dispatch(resetBlogBySourceBlogState());
      return;
    }
  }, [blogsBySourceBlogSelector.success, blogsBySourceBlogSelector.error]);

  useEffect(() => {
    if (likeBlogSelector.success) {
      if (likeBlogSelector.data) {
        const blogResult = likeBlogSelector.data;
        const blogsUpdated = blogs.map(blog => {
          if (blog.blogId === blogResult.blogId) {
            blog = {
              ...blog,
              isLiked: blogResult.isLiked,
            };
          }
          return blog;
        });
        setBlogs(blogsUpdated);
        dispatch(resetLikeBlogState());
      }
    }

    if (likeBlogSelector.error) {
      toast.error('Something went wrong');
      dispatch(resetLikeBlogState());
    }
  }, [likeBlogSelector.success, likeBlogSelector.error]);

  useEffect(() => {
    if (bookmarkBlogSelector.success) {
      if (bookmarkBlogSelector.data) {
        const blogResult = bookmarkBlogSelector.data;
        const blogsUpdated = blogs.map(blog => {
          if (blog.blogId === blogResult.blogId) {
            blog = {
              ...blog,
              isBookmarked: blogResult.isBookmarked,
            };
          }
          return blog;
        });
        setBlogs(blogsUpdated);
        dispatch(resetBookmarkBlogState());
      }
    }

    if (bookmarkBlogSelector.error) {
      toast.error('Something went wrong');
      dispatch(resetBookmarkBlogState());
    }
  }, [bookmarkBlogSelector.success, bookmarkBlogSelector.error]);

  return (
    <div className={'sm:px-10 w-full'}>
      <div
        id={'scrollBlogId'}
        className={'overflow-y-auto h-[calc(100vh_-_136px)] scrollbar-hide'}>
        {props.showContainerOfGridAndFilter && (
          <ContainerForFilterGetDataAndGridType
            stateAffichage={stateAffichage}
            setStateAffichage={setStateAffichage}
            stateGrid={stateGrid}
            setStateGrid={setStateGrid}
          />
        )}
        {blogs.length === 0 ? (
          <div className={'flex justify-center items-center h-full'}>
            We are trying to get you the best blogs from the net
          </div>
        ) : (
          <InfiniteScroll
            next={() => fetchBlogs(false)}
            hasMore={metaData.hasNextPage}
            loader={<div></div>}
            dataLength={blogs.length}
            scrollableTarget={'scrollBlogId'}
            scrollThreshold={0.8}
            className={'mx-auto w-full overflow-hidden scrollbar-hide'}
            style={{overflow: 'hidden'}}>
            <BlogsCardLists
              blogs={blogs}
              gridBlogType={stateGrid}
              showAd={props.showAd}></BlogsCardLists>
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
}

export default BlogList;
