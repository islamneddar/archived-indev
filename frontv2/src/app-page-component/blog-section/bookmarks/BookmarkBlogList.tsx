import React, {useEffect, useState} from 'react';
import BlogCard from '@/app-page-component/blog-section/blogs/blog-card/BlogCard';
import {Blog, GetBookmarksParams} from '@/infra/web-services/types/blogs/blog';
import {useUserSessionSelector} from '@/redux/slices/auth/user/user.selector';
import {useDispatch} from 'react-redux';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {getAllBookmarksThunk} from '@/redux/slices/blogs/blog/api/get-all-bookmarks/get-all-bookmarks.thunk';
import {useGetAllBookmarksSelector} from '@/redux/slices/blogs/blog/api/get-all-bookmarks/get-all-bookmarks.selector';
import {resetGetBookmarkState} from '@/redux/slices/blogs/blog/api/get-all-bookmarks/get-all-bookmarks.slice';
import PrimaryButton from '@/components/button/PrimaryButton';

function BookmarkBlogList() {
  const dispatchThunk = useDispatch<ThunkDispatch<any, any, any>>();
  const dispatch = useDispatch();

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [dateLastBlogFetch, setDateLastBlogFetch] = useState<
    string | undefined
  >(undefined);
  const [allBookmarkedBlogsSeen, setAllBookmarkedBlogsSeen] = useState(false);

  const userSessionSelector = useUserSessionSelector();
  const getAllBookmarksSelector = useGetAllBookmarksSelector();

  useEffect(() => {
    async function getBookmarkedBlogs() {
      await fetchBookmarkedBlogs(undefined);
    }

    if (dateLastBlogFetch === undefined) {
      getBookmarkedBlogs();
    }
  }, []);

  const fetchBookmarkedBlogs = async (dateLastBlogList: string | undefined) => {
    const getBookmarksParams: GetBookmarksParams = {
      dateLastBlogList: dateLastBlogList,
      page: 1,
      accessToken: userSessionSelector.user.accessToken,
    };

    dispatchThunk(getAllBookmarksThunk(getBookmarksParams));
  };

  useEffect(() => {
    if (getAllBookmarksSelector.success) {
      if (getAllBookmarksSelector.data) {
        const blogsBookmarked = getAllBookmarksSelector.data.data;
        if (blogsBookmarked.length === 0) {
          setAllBookmarkedBlogsSeen(true);
          return;
        }
        setBlogs([...blogs, ...blogsBookmarked]);
        setDateLastBlogFetch(
          blogsBookmarked[blogsBookmarked.length - 1].bookmarkTime,
        );
        dispatch(resetGetBookmarkState());
      }
    }
  }, [getAllBookmarksSelector.success, getAllBookmarksSelector.error]);

  if (blogs.length === 0) {
    return (
      <div className={'w-full h-full flex justify-center items'}>
        <p>no bookmarked blogs found</p>
      </div>
    );
  }

  return (
    <div className={'flex w-full flex-col'}>
      <div
        className={`flex grid tn:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-2.5 gap-y-2 justify-center items-center`}>
        {blogs.map((blog, index) => {
          return (
            <div
              key={index}
              className={'flex justify-center items-center w-full'}>
              <BlogCard blog={blog}></BlogCard>
            </div>
          );
        })}
      </div>
      {allBookmarkedBlogsSeen ? (
        <div className={'py-3 flex w-full justify-center items-center'}>
          <p>all bookmarked blogs was seen</p>
        </div>
      ) : (
        <div className={'py-3 w-full flex justify-center items-center'}>
          <PrimaryButton
            title={'LoadMore'}
            loading={getAllBookmarksSelector.loading}
            disabled={getAllBookmarksSelector.loading}
            onClick={() => {
              fetchBookmarkedBlogs(dateLastBlogFetch);
            }}
          />
        </div>
      )}
    </div>
  );
}

export default BookmarkBlogList;
