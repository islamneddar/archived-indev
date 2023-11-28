'use client';
import React from 'react';
import {CategoryType} from '@/infra/web-services/types/ai-tools/category-ai-tools';
import useGetCategoryFromPathName from '@/infra/hooks/ai-tool-section/useGetCategoryFromPathName';
import useGetListAiToolCategories from '@/infra/hooks/ai-tool-section/useGetListAiToolCategories';

function AiToolBodyCategoryFilter() {
  const category = useGetCategoryFromPathName();

  const listCategoriesAiTools = useGetListAiToolCategories();

  return (
    <div>
      <h2 className={'text-black text-md'}>Categories </h2>
      <div className={'h-180 overflow-auto py-2'}>
        {listCategoriesAiTools.map((categoryItem: CategoryType, index) => {
          return (
            <div
              key={index}
              className={`${
                categoryItem.type === category ? 'bg-indigo-200' : ''
              } text-black p-2 cursor-pointer text-sm`}>
              {categoryItem.name}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AiToolBodyCategoryFilter;
