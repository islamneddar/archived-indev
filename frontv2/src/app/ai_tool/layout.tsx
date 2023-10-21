'use client';
import React, {Fragment, useEffect, useState} from 'react';
import NavBar from '@/app-page-component/navbar/NavBar';
import SideBarMain from '@/app-page-component/sidebar/SideBarMain';
import {NavigationType} from '@/types/general/sidebar.type';
import routing from '@/routes/routing.constant';
import {useLocalStorage} from 'usehooks-ts';
import {ListCategoryType} from '@/types/api/ai-tools/category-ai-tools';
import dayjs from 'dayjs';
import {ListCategoryTypeInLocalStorage} from '@/types/general/local-storage/ai-tool-category';
import {useQuery} from 'react-query';
import AiToolCategoryService from '@/services/ai-tools/ai-tool-category.service';

interface LayoutState {
  enabledQuery: boolean;
  navigation: NavigationType[];
}

function Layout({children}: {children: React.ReactNode}) {
  const [listCategoryAiTools, setListCategoryAiTools] =
    useLocalStorage<ListCategoryTypeInLocalStorage>('list_category_ai_tool', {
      lastUpdate: new Date(),
      listCategory: {},
    });

  const [state, setState] = useState<LayoutState>({
    enabledQuery: false,
    navigation: [],
  });

  const getListCategoriesAiToolQuery = useQuery(
    ['getListCategoriesAiTools'],
    () => {
      return fetchListCategories();
    },
    {
      keepPreviousData: true,
      enabled: state.enabledQuery,
    },
  );

  const setCategoriesAiTool = () => {
    const nowMinus24hours = dayjs().subtract(24, 'hour');
    const lastUpdateIsBefore24Hours = dayjs(
      listCategoryAiTools?.lastUpdate,
    ).isBefore(nowMinus24hours);
    if (
      listCategoryAiTools === undefined ||
      Object.keys(listCategoryAiTools?.listCategory).length === 0 ||
      lastUpdateIsBefore24Hours
    ) {
      setState(prevState => ({
        ...prevState,
        enabledQuery: true,
      }));
    } else {
      updateAndSetAiToolCategories(listCategoryAiTools?.listCategory);
    }
  };

  const fetchListCategories = async () => {
    const response = await AiToolCategoryService.getInstance().getAllV2();
    setListCategoryAiTools({
      lastUpdate: new Date(),
      listCategory: response.data,
    });
    updateAndSetAiToolCategories(response.data);
  };

  const updateAndSetAiToolCategories = (
    listCategoriesAiToolsToPut: ListCategoryType,
  ) => {
    const listCategories: {
      name: string;
      href: string;
      extraData?: {
        numberOfTool: number | undefined;
      } | null;
    }[] = [
      {
        name: 'All',
        href: routing.aiTools.aiTool('all'),
        extraData: null,
      },
    ];
    for (const [key, value] of Object.entries(listCategoriesAiToolsToPut)) {
      listCategories.push({
        name: value.name,
        href: routing.aiTools.aiTool(value.type),
        extraData: {
          numberOfTool: value.numberOfTool,
        },
      });
    }
    setState(prevState => ({
      ...prevState,
      enabledQuery: false,
      navigation: listCategories,
    }));
  };

  useEffect(() => {
    setCategoriesAiTool();
  }, []);

  if (getListCategoriesAiToolQuery.isLoading) {
    return (
      <div className={'flex justify-center items-center h-screen w-screen'}>
        <p className={'text-black'}>Loading</p>
      </div>
    );
  }

  if (getListCategoriesAiToolQuery.isError) {
    return (
      <div className={'flex justify-center items-center h-screen w-screen'}>
        <p className={'text-black'}>Error</p>
      </div>
    );
  }

  return (
    <>
      <NavBar />
      <div className="bg-secondary h-[calc(100vh_-_96px)]">
        <SideBarMain navigation={state.navigation} />
        <Fragment>
          <div className={' w-full md:pl-64'}>{children}</div>
        </Fragment>
      </div>
    </>
  );
}

export default Layout;
