import React from 'react';

function Page({params}: {params: {section: string}}) {
  return <div>{params.section}</div>;
}

export default Page;
