import React from 'react';
import BookmarkBlogList from '@/app-page-component/blog-section/bookmarks/BookmarkBlogList';

function BookmarkBlogBody() {
  return (
    <div className={'overflow-y-auto h-[calc(100vh_-_136px)]'}>
      <BookmarkBlogList></BookmarkBlogList>
    </div>
  );
}

export default BookmarkBlogBody;
