'use client';
import React from 'react';
import {LocalStorageKeysEnums} from '@/infra/enums/local-storage-enums';
import {
  CategoryType,
  ListCategoryType,
} from '@/types/api/ai-tools/category-ai-tools';
import {StringUtils} from '@/utils/string';
import useGetCategoryFromPathName from '@/infra/hooks/useGetCategoryFromPathName';

function AiToolBodyCategoryFilter() {
  const category = useGetCategoryFromPathName();
  console.log('category', category);
  const categoriesAiToolsString = localStorage.getItem(
    LocalStorageKeysEnums.LIST_CATEGORY_AI_TOOLS,
  );

  const listCategoriesAiToolsTypes = JSON.parse(
    categoriesAiToolsString as string,
  ) as ListCategoryType;

  const listCategoriesAiTools = Array.from(
    Object.values(listCategoriesAiToolsTypes.listCategory),
  );

  listCategoriesAiTools.sort((a, b) => {
    const firstLetterInA =
      StringUtils.getInstance().getFirstLetterAlphanumericInAString(a.name);
    const firstLetterInB =
      StringUtils.getInstance().getFirstLetterAlphanumericInAString(b.name);
    if (firstLetterInA && firstLetterInB) {
      return firstLetterInA.localeCompare(firstLetterInB);
    } else return 0;
  });

  listCategoriesAiTools.unshift({
    name: 'All',
    type: 'all',
  });

  console.log('listCategoriesAiTools', listCategoriesAiTools);
  return (
    <div>
      <h2 className={'text-black text-sm'}>Categories </h2>
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
