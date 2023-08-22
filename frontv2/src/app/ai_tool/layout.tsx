'use client';
import React, {Fragment, useEffect, useState} from 'react';
import NavBar from '@/app-page-component/navbar/NavBar';
import SideBarMain from '@/app-page-component/sidebar/SideBarMain';
import {
  ListCategoryTypeInLocalStorage,
  NavigationType,
} from '@/types/general/sidebar.type';
import routing from '@/routes/routing.constant';
import {useLocalStorage} from 'usehooks-ts';
import {useDispatch} from 'react-redux';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {getAllCategoriesAiToolsThunk} from '@/redux/slices/ai-tools/category-ai-tool/api/get-all-categories/get-all-categories.thunk';
import {useGetAllAiToolsCategoriesSelector} from '@/redux/slices/ai-tools/category-ai-tool/api/get-all-categories/get-all-categories.selector';
import {ListCategoryType} from '@/types/api/ai-tools/category-ai-tools';
import SideBarMainAiTool from '@/app-page-component/sidebar-ai-tool/SideBarMainAiTool';

function Layout({children}: {children: React.ReactNode}) {
  const dispatchThunk = useDispatch<ThunkDispatch<any, any, any>>();

  const getAllCategoriesAiToolsSelector = useGetAllAiToolsCategoriesSelector();

  const [listCategoryAiTools, setListCategoryAiTools] =
    useLocalStorage<ListCategoryTypeInLocalStorage>('list_category_ai_tool', {
      lastUpdate: new Date(),
      listCategory: {},
    });

  const [navigationState, setNavigationState] = useState<NavigationType[]>([]);

  useEffect(() => {
    async function fetchListCategories() {
      fetchTheListOfCategories();
    }
    console.log(listCategoryAiTools);
    if (
      listCategoryAiTools === undefined ||
      Object.keys(listCategoryAiTools?.listCategory).length === 0
    ) {
      fetchListCategories();
    } else {
      setListNavigation(listCategoryAiTools.listCategory);
    }
  }, []);

  useEffect(() => {
    if (getAllCategoriesAiToolsSelector.success) {
      if (getAllCategoriesAiToolsSelector.data) {
        setListCategoryAiTools({
          lastUpdate: new Date(),
          listCategory: getAllCategoriesAiToolsSelector.data.data,
        });
        setListNavigation(getAllCategoriesAiToolsSelector.data.data);
      }
    }
  }, [getAllCategoriesAiToolsSelector.success]);

  // function
  const fetchTheListOfCategories = () => {
    dispatchThunk(getAllCategoriesAiToolsThunk(null));
  };

  const setListNavigation = (listCategory: ListCategoryType) => {
    const listCategories = [
      {
        name: 'All',
        href: routing.aiTools.aiTool('all'),
      },
    ];
    for (const [key, value] of Object.entries(listCategory)) {
      listCategories.push({
        name: value.name,
        href: routing.aiTools.aiTool(value.type),
      });
    }
    setNavigationState(listCategories);
  };

  if (getAllCategoriesAiToolsSelector.loading) {
    return <p>Loading</p>;
  }

  return (
    <>
      <NavBar />
      <div className="bg-secondary h-[calc(100vh_-_96px)]">
        <SideBarMainAiTool navigation={navigationState} />
        <Fragment>
          <div className={' w-full md:pl-64'}>{children}</div>
        </Fragment>
      </div>
    </>
  );
}

export default Layout;
