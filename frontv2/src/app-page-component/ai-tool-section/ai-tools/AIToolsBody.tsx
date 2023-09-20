'use client';
import React, {useEffect, useState} from 'react';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import {AiTool, GetAllAiToolRequest} from '@/types/api/ai-tools/ai-tool';
import {
  PageMetaResponse,
  PaginationRequestMetaRequest,
} from '@/types/api/common';
import {getAllAiToolThunk} from '@/redux/slices/ai-tools/ai-tool/api/get-all/get-all-ai-tool.thunk';
import AiToolCard from '@/app-page-component/ai-tool-section/ai-tools/AiToolCard';
import {useGetAllAiToolSelector} from '@/redux/slices/ai-tools/ai-tool/api/get-all/get-all-ai-tool.selector';
import {resetGetAllAiTool} from '@/redux/slices/ai-tools/ai-tool/api/get-all/get-all-ai-tool.slice';
import toast from 'react-hot-toast';
import {ProgressSpinner} from 'primereact/progressspinner';
import PrimaryButton from '@/components/button/PrimaryButton';

import './ai-tools-body.css';
import AiToolItemDialog from '@/app-page-component/ai-tool-section/ai-tools/ai-tool-dialog/AiToolItemDialog';

interface AiToolsBodyProps {
  category?: string;
}

function AiToolsBody(props: AiToolsBodyProps) {
  // data
  const dispatchThunk = useDispatch<ThunkDispatch<any, any, any>>();
  const dispatch = useDispatch();
  const category = props.category || 'all';

  // state
  const [aiTools, setAiTools] = useState<AiTool[]>([]);
  const [restart, setRestart] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [metaData, setMetaData] = useState<PageMetaResponse>({
    page: 1,
    hasPreviousPage: false,
    hasNextPage: false,
    itemCount: 1,
  });
  const [dialogItemAiToolVisible, setDialogItemAiToolVisible] =
    React.useState(true);

  // selectors
  const selectGetAllAiTool = useGetAllAiToolSelector();

  // effects
  useEffect(() => {
    async function getAiTool() {
      await fetchAiTools(restart);
    }

    if (restart && page === 1) {
      setAiTools([]);
      getAiTool();
    }
  }, [restart]);

  // functions
  async function fetchAiTools(restart: boolean) {
    const paginationRequest: PaginationRequestMetaRequest = {
      page: page,
      take: 30,
    };

    const getAllAiTools: GetAllAiToolRequest = {
      pageOption: paginationRequest,
      category: category,
      isAll: category === 'all',
    };

    dispatchThunk(getAllAiToolThunk(getAllAiTools));

    if (restart) {
      setRestart(false);
    }
  }

  useEffect(() => {
    if (selectGetAllAiTool.success) {
      if (selectGetAllAiTool.data) {
        setAiTools([...aiTools, ...selectGetAllAiTool.data.data]);
        setPage(page + 1);
        setMetaData(selectGetAllAiTool.data.meta);
        dispatch(resetGetAllAiTool());
      }
    }

    if (selectGetAllAiTool.error) {
      toast.error("Can't fetch ai tools, please try later");
      dispatch(resetGetAllAiTool());
    }
  }, [selectGetAllAiTool.success, selectGetAllAiTool.error]);

  // rendering
  if (selectGetAllAiTool.loading && page === 1) {
    return (
      <div className={'flex h-full items-center'}>
        <ProgressSpinner></ProgressSpinner>
      </div>
    );
  }
  return (
    <div className={'p-3'}>
      <AiToolItemDialog />
      <div className={'flex w-full h-full justify-center items-center'}>
        <div
          className={
            'text-3xl py-5 font-medium flex justify-center flex-col items-center'
          }>
          <p className={'pb-3'}>
            Explore the best AI tools{' '}
            <span className={'italic font-semibold'}>
              {category === 'all' ? '' : `in ${category}`}
            </span>{' '}
            Updated daily
          </p>
          <p>
            Find the right tool from our list of{' '}
            <span className={'italic font-semibold'}>
              +{metaData.itemCount} AI tools
            </span>
          </p>
        </div>
      </div>
      <div
        className={
          'grid tn:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center'
        }>
        {aiTools.map((aiTool, index) => {
          return (
            <AiToolCard key={aiTool.aiToolId} aiTool={aiTool}></AiToolCard>
          );
        })}
      </div>
      {selectGetAllAiTool.loading && (
        <div className={'flex pt-5'}>
          <ProgressSpinner></ProgressSpinner>
        </div>
      )}
      {metaData.hasNextPage && !selectGetAllAiTool.loading && (
        <div className={'flex justify-center mt-3'}>
          <PrimaryButton
            buttonClassName={
              'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            }
            title={'Load more'}
            loading={selectGetAllAiTool.loading}
            disabled={selectGetAllAiTool.loading}
            onClick={() => {
              //setRestart(true);
              fetchAiTools(false);
            }}></PrimaryButton>
        </div>
      )}
    </div>
  );
}

export default AiToolsBody;
