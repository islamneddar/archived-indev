'use client';
import React, {useEffect} from 'react';
import {listAiToolCategory} from '@/common/constants/ai-tool-categories';
import {
  AiToolCreationInput,
  aiToolCreationSchema,
} from '@/app/admin/ai-tool-creation/ai-tool-creation.form';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useDispatch} from 'react-redux';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {CreateAiToolRequest} from '@/types/api/ai-tool';
import {createAiToolThunk} from '@/redux/slices/ai-tool/api/create-ai-tool/create-ai-tool.thunk';
import {useCreateAiToolSelector} from '@/redux/slices/ai-tool/api/create-ai-tool/create-ai-tool.selector';

function Page() {
  const dispatchThunk = useDispatch<ThunkDispatch<any, any, any>>();

  const useCreateAiTool = useCreateAiToolSelector();

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<AiToolCreationInput>({
    resolver: yupResolver(aiToolCreationSchema),
  });

  //useEffect
  useEffect(() => {
    if (useCreateAiTool.success) {
      alert('success');
    }

    if (useCreateAiTool.error) {
      alert('error');
    }
  }, [useCreateAiTool.success, useCreateAiTool.error]);

  // domain function
  const addAiTool = () => {
    const onSubmit = (resultInput: AiToolCreationInput) => {
      const createAiToolRequest: CreateAiToolRequest = {
        name: resultInput.name,
        description: resultInput.description,
        url: resultInput.url,
        category: resultInput.category,
        pricing: resultInput.pricing,
        file: resultInput.file[0],
      };

      dispatchThunk(createAiToolThunk(createAiToolRequest));
    };
    handleSubmit(onSubmit)();
  };

  return (
    <div className={'flex h-full w-full justify-center flex-col p-5 gap-y-5'}>
      <h1 className={'text-2xl font-bold'}>Add a new ai tool</h1>
      <input
        id={'name'}
        type="text"
        placeholder={'Name'}
        className={'border-black rounded-lg border-1 py-2 px-1'}
        {...register('name')}
      />
      <textarea
        id={'description'}
        placeholder={'Description'}
        className={'border-black rounded-lg border-1 py-2 px-1'}
        {...register('description')}
      />
      <input
        id={'website'}
        type="url"
        placeholder={'website url'}
        className={'border-black rounded-lg border-1 py-2 px-1'}
        {...register('url')}
      />
      <input
        id={'imagefile'}
        type="file"
        placeholder={'image'}
        {...register('file')}
      />
      <select
        id={'category'}
        className={'border-black rounded-lg border-1 py-2 px-1'}
        {...register('category')}>
        <option disabled={true} value={'choose a category'}>
          choose a category
        </option>
        {Object.keys(listAiToolCategory).map(option => {
          return (
            <option key={option} value={option}>
              {option}
            </option>
          );
        })}
      </select>
      <select
        id={'pricing'}
        className={'border-black rounded-lg border-1 py-2 px-1'}
        {...register('pricing')}>
        <option disabled={true} value={'choose a princing'}>
          choose a pricing
        </option>
        <option value={'free'}>Free</option>
        <option value={'paid'}>Paid</option>
        <option value={'free_plan'}>Free Plan</option>
        <option value={'free_trial'}>Free Trial</option>
      </select>
      <button
        disabled={useCreateAiTool.loading}
        className={'bg-amber-100 py-3'}
        onClick={() => {
          addAiTool();
        }}>
        {useCreateAiTool.loading ? 'Adding the tool' : 'Submit'}
      </button>
    </div>
  );
}

export default Page;
