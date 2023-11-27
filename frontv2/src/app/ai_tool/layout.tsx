'use client';
import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import NavBar from '@/app-page-component/navbar/NavBar';
import {useLocalStorage} from 'usehooks-ts';
import dayjs from 'dayjs';
import {ListCategoryTypeInLocalStorage} from '@/types/general/local-storage/ai-tool-category';
import {useQuery} from 'react-query';
import AiToolCategoryService from '@/services/ai-tools/ai-tool-category.service';
import UseSessionAuthClient from '@/infra/hooks/useSessionAuthClient';
import {LocalStorageKeysEnums} from '@/infra/enums/local-storage-enums';
import {AiToolService} from '@/services/ai-tools/ai-tool.service';

interface LayoutState {
  enabledQuery: boolean;
}

function Layout({children}: {children: React.ReactNode}) {
  const {session, userSessionSelector} = UseSessionAuthClient(); // Rendering
  const [listCategoryAiTools, setListCategoryAiTools] =
    useLocalStorage<ListCategoryTypeInLocalStorage>(
      LocalStorageKeysEnums.LIST_CATEGORY_AI_TOOLS,
      {
        lastUpdate: new Date(),
        listCategory: {},
      },
    );

  const listAiToolPricing = useMemo(() => {
    return localStorage.getItem(LocalStorageKeysEnums.LIST_PRICING_AI_TOOLS);
  }, []);

  const [state, setState] = useState<LayoutState>({
    enabledQuery: false,
  });

  const getListCategoriesAiToolQuery = useQuery(
    ['getListCategoriesAiTools'],
    () => {
      //return fetchListCategories();
      return fetchListOnLoadedData(); // categories, prices
    },
    {
      keepPreviousData: true,
      enabled: state.enabledQuery,
    },
  );

  // functions
  const setCategoriesAiTool = () => {
    const nowMinus24hours = dayjs().subtract(12, 'hour');
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
      //updateAndSetAiToolCategories(listCategoryAiTools?.listCategory);
    }
  };

  const fetchListOnLoadedData = async () => {
    const getAllAiToolOnLoadedData =
      await AiToolService.getInstance().getAllOnLoadedData();
  };

  // @deprecated
  const fetchListCategories = async () => {
    const getAllAiToolsCategories =
      await AiToolCategoryService.getInstance().getAllV2();

    setListCategoryAiTools({
      lastUpdate: new Date(),
      listCategory: getAllAiToolsCategories.data,
    });
    //updateAndSetAiToolCategories(response.data);
  };

  useEffect(() => {
    setCategoriesAiTool();
  }, []);

  if (getListCategoriesAiToolQuery.isLoading) {
    return (
      <div className={'flex justify-center items-center h-screen w-screen'}>
        <p className={'text-black'}>Loading...</p>
      </div>
    );
  }

  if (getListCategoriesAiToolQuery.isError) {
    return (
      <div className={'flex justify-center items-center h-screen w-screen'}>
        <p className={'text-black font-bold'}>
          Please refresh the page or try later. If the problem persists, please
          contact us at on support@inoomify.com
        </p>
      </div>
    );
  }

  if (
    (session.status === 'authenticated' &&
      userSessionSelector.isAuthenticated) ||
    session.status === 'unauthenticated'
  ) {
    return (
      <>
        <NavBar />
        <div className="bg-secondary">
          <Fragment>
            <div className={' w-full'}>{children}</div>
          </Fragment>
        </div>
      </>
    );
  } else {
    return <div className={'h-screen bg-secondary'}></div>;
  }
}

export default Layout;
