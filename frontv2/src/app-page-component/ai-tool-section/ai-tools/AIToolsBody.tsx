'use client';
import React, {useState} from 'react';
import {AiTool} from '@/infra/web-services/types/ai-tools/ai-tool';
import {
  PageMetaResponse,
  PaginationRequestMetaRequest,
} from '@/infra/web-services/types/common';
import {ProgressSpinner} from 'primereact/progressspinner';

import './ai-tools-body.css';
import AiToolItemDialog from '@/app-page-component/ai-tool-section/ai-tools/ai-tool-dialog/AiToolItemDialog';
import {AiToolCategoryEnum} from '@/infra/enums/ai-tool/ai-tool-category.enum';
import {DropdownChangeEvent} from 'primereact/dropdown';
import {PricingEnum} from '@/infra/enums/ai-tool/pricing-mode.enum';
import {useQuery} from 'react-query';
import {AiToolService} from '@/infra/web-services/services/ai-tools/ai-tool.service';
import AiToolsHeaderFilters from '@/app-page-component/ai-tool-section/ai-tools/ai-tool-body/header-filter/AiToolsHeaderFilters';
import AiToolsListingContainer from '@/app-page-component/ai-tool-section/ai-tools/ai-tool-body/AiToolsListingContainer';

interface AiToolsBodyProps {
  category?: string;
}

interface AiToolsBodyState {
  aiTools: AiTool[];
  restart: boolean;
  page: number;
  metaData: PageMetaResponse;
  selectedAiToolPricing: any;
  enabledQuery: boolean;
  searchText: string;
  lastSearchedText?: string;
}

function AiToolsBody(props: AiToolsBodyProps) {
  // data
  const category = props.category || 'all';
  //const aiPricingModes = getListAiPricingMode();

  /**
   * State
   */
  const [state, setState] = useState<AiToolsBodyState>({
    aiTools: [],
    restart: true,
    page: 1,
    metaData: {
      page: 1,
      hasPreviousPage: false,
      hasNextPage: false,
      itemCount: 1,
    },
    selectedAiToolPricing: {
      name: 'ALL',
      type: PricingEnum.ALL,
    },
    searchText: '',
    enabledQuery: true,
  });

  /**
   * Query
   */
  const getListToolsResults = useQuery(
    ['getListQuery', state.page],
    () => {
      return fetchAiTools(state.restart);
    },
    {
      keepPreviousData: true,
      enabled: state.enabledQuery,
    },
  );

  /**
   * Functions
   */
  async function fetchAiTools(restart: boolean) {
    const paginationRequest: PaginationRequestMetaRequest = {
      page: state.page,
      take: 30,
    };

    const getAllAiToolsRequest: any = {
      pageOption: paginationRequest,
    };

    if (category !== 'all') {
      getAllAiToolsRequest['category'] = category as AiToolCategoryEnum;
    }

    if (state.selectedAiToolPricing.type !== PricingEnum.ALL) {
      getAllAiToolsRequest['pricing'] = state.selectedAiToolPricing.type;
    }

    if (state.searchText !== '') {
      getAllAiToolsRequest['searchText'] = state.searchText;
    }

    const response = await AiToolService.getInstance().findAll(
      getAllAiToolsRequest,
    );

    setState(prevState => ({
      ...prevState,
      aiTools: [...prevState.aiTools, ...response.data],
      metaData: response.meta,
      restart: restart ? false : prevState.restart,
      enabledQuery: false,
    }));
    return response;
  }

  const onChangePricingDropdown = (e: DropdownChangeEvent) => {
    setState(prevState => ({
      ...prevState,
      selectedAiToolPricing: e.value,
      page: 1,
      enabledQuery: true,
      aiTools: [],
    }));
  };

  const onChangeInputSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(prevState => ({
      ...prevState,
      searchText: e.target.value,
    }));
  };

  const onSearchClick = () => {
    if (state.searchText !== state.lastSearchedText) {
      setState(prevState => ({
        ...prevState,
        lastSearchText: prevState.searchText,
        page: 1,
        enabledQuery: true,
        aiTools: [],
      }));
    }
  };

  /**
   * Rendering
   */

  if (getListToolsResults.isLoading && state.page === 1) {
    return (
      <div className={'flex h-full items-center'}>
        <ProgressSpinner></ProgressSpinner>
      </div>
    );
  }

  return (
    <div className={'p-3'}>
      <AiToolItemDialog />

      {/*<AiToolBodyHeader
        aiToolNumber={state.metaData.itemCount}
        category={category}></AiToolBodyHeader>*/}

      <div className={'px-20'}>
        <AiToolsHeaderFilters
          //aiPricingModes={aiPricingModes}
          selectedAiToolPricing={state.selectedAiToolPricing}
          placeholder={'Search for AI tools'}
          onChange={(e: DropdownChangeEvent) => {
            onChangePricingDropdown(e);
          }}
          onChangeSearch={(e: React.ChangeEvent<HTMLInputElement>) => {
            onChangeInputSearch(e);
          }}
          onSearchClick={() => {
            onSearchClick();
          }}></AiToolsHeaderFilters>

        <AiToolsListingContainer
          aiTools={state.aiTools}
          isLoading={getListToolsResults.isLoading}
          hasNextPage={state.metaData.hasNextPage}
          onClickLoadMore={() => {
            setState(prevState => ({
              ...prevState,
              page: prevState.page + 1,
              enabledQuery: true,
            }));
          }}
        />
      </div>
    </div>
  );
}

export default AiToolsBody;
