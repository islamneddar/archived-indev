'use client';
import React, {Fragment, useCallback, useEffect, useState} from 'react';
import NavBar from '@/app-page-component/navbar/NavBar';
import dayjs from 'dayjs';
import {useQuery} from 'react-query';
import UseSessionAuthClient from '@/infra/hooks/useSessionAuthClient';
import {AiToolService} from '@/infra/web-services/services/ai-tools/ai-tool.service';
import {LocalStorageService} from '@/infra/external-service/local-storage/local-storage.service';
import {
  AiToolCategoryMap,
  AiToolPlatformMap,
  AiToolPricingMap,
  InfoAiToolOnLoad,
} from '@/infra/types/ai-tool.type';
import {GetAllAiToolsOnLoadedInfoResponse} from '@/infra/web-services/types/ai-tools/ai-tool';
import {CategoryAiToolWithId} from '@/infra/web-services/types/ai-tools/category-ai-tools';

interface LayoutState {
  enabledQuery: boolean;
}

function Layout({children}: {children: React.ReactNode}) {
  const {session, userSessionSelector} = UseSessionAuthClient(); // Rendering

  const infoAiToolOnLoad =
    LocalStorageService.getInstance().getInfoAiToolOnLoadedData();

  const [state, setState] = useState<LayoutState>({
    enabledQuery: false,
  });

  const getDataAiInfoOnLoaded = useQuery(
    ['getListCategoriesAiTools'],
    () => {
      //return fetchListCategories();
      return fetchListOnLoadedData(); // categories, prices
    },
    {
      onSuccess: data => {
        getDataInfoAiToolOnLoadedSuccess(data);
      },
      keepPreviousData: true,
      enabled: state.enabledQuery,
    },
  );

  /**
   * Functions
   */
  const setDataAiToolsInfoOnLoad = useCallback(() => {
    const nowMinus24hours = dayjs().subtract(12, 'hour');
    const lastUpdateIsBefore24Hours = dayjs(
      infoAiToolOnLoad?.lastUpdate,
    ).isBefore(nowMinus24hours);
    if (
      infoAiToolOnLoad?.aiToolCategories === undefined ||
      infoAiToolOnLoad?.aiToolsPricing === null ||
      infoAiToolOnLoad?.aiToolsPlatform === null ||
      infoAiToolOnLoad.aiToolCategories.length === 0 ||
      infoAiToolOnLoad.aiToolsPricing.length === 0 ||
      infoAiToolOnLoad.aiToolsPlatform.length === 0 ||
      lastUpdateIsBefore24Hours
    ) {
      setState(prevState => ({
        ...prevState,
        enabledQuery: true,
      }));
    } else {
      //updateAndSetAiToolCategories(listCategoryAiTools?.listCategory);
    }
  }, [infoAiToolOnLoad?.aiToolCategories, infoAiToolOnLoad?.lastUpdate]);

  const fetchListOnLoadedData = async () => {
    return await AiToolService.getInstance().getAllOnLoadedData();
  };

  const getDataInfoAiToolOnLoadedSuccess = (
    data: GetAllAiToolsOnLoadedInfoResponse,
  ) => {
    const listCategory = data.aiToolsCategory;
    const listPricing = data.aiToolsPricing;
    const listPlatforms = data.aiToolsPlatform;

    const dataAiToolLastUpdated: InfoAiToolOnLoad = {
      lastUpdate: new Date(),
      aiToolCategories: listCategory,
      aiToolsPricing: listPricing,
      aiToolsPlatform: listPlatforms,
    };

    LocalStorageService.getInstance().setInfoAiToolOnLoadedData(
      dataAiToolLastUpdated,
    );
    LocalStorageService.getInstance().setCategoriesAiToolMap(
      listCategory.reduce((acc, category) => {
        acc[category.type] = category;
        return acc;
      }, {} as AiToolCategoryMap),
    );
    LocalStorageService.getInstance().setPriceAiToolMap(
      listPricing.reduce((acc, pricing) => {
        acc[pricing.type] = pricing;
        return acc;
      }, {} as AiToolPricingMap),
    );
    LocalStorageService.getInstance().setPlatformAiToolMap(
      listPlatforms.reduce((acc, platform) => {
        acc[platform.type] = platform;
        return acc;
      }, {} as AiToolPlatformMap),
    );
  };

  /**
   * Effects
   */
  useEffect(() => {
    setDataAiToolsInfoOnLoad();
  }, [setDataAiToolsInfoOnLoad]);

  /**
   * Rendering
   */
  if (getDataAiInfoOnLoaded.isLoading) {
    return (
      <div className={'flex justify-center items-center h-screen w-screen'}>
        <p className={'text-black'}>Loading...</p>
      </div>
    );
  }

  if (getDataAiInfoOnLoaded.isError) {
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
