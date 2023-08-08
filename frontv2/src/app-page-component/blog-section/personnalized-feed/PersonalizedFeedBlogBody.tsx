import React from 'react';
import BlogList from '@/app-page-component/blog-section/blogs/BlogList';
import {GridBlogType} from '@/types/general/blog-general.type';

function PersonalizedFeedBlogBody() {
  return (
    <div className={'px-5 tn:px-2 sm:px-3 h-full flex flex-1 relative'}>
      <div className={'flex h-full flex-1 flex-col pt-5 justify-center'}>
        {
          <BlogList
            gridToShow={GridBlogType.GRID}
            showAd={true}
            showContainerOfGridAndFilter={false}
            forSpecificSourceBlog={null}
            followedBlogs={true}
          />
        }
      </div>
    </div>
  );
}

export default PersonalizedFeedBlogBody;
