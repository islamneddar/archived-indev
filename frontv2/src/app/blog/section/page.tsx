'use client';
import React from 'react';

function SectionPage({params}: {params: {section: string}}) {
  /*if (routing.blog.home.includes(params.section)) {
    return <BlogsBody></BlogsBody>;
  }

  if (routing.blog.followSource.includes(params.section)) {
    if (!userSessionSelector.isAuthenticated) {
      //router.push('/auth/login');
      console.debug('go to login');
    } else {
      return (
        <div className={'p-5 w-full flex'}>
          <SourceBlogBody></SourceBlogBody>
        </div>
      );
    }
  }*/
  return <div>{params.section}</div>;
}

export default SectionPage;
