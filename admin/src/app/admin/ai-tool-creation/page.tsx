'use client';
import React, {useEffect} from 'react';
import {listAiToolCategory} from '@/common/constants/ai-tool-categories';
import {
  AiToolCreationInput,
  aiToolCreationSchema,
} from '@/app/admin/ai-tool-creation/ai-tool-creation.form';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {CreateAiToolRequest} from '@/types/api/ai-tool';
import {useAdminSessionSelector} from '@/redux/slices/auth/admin/admin.selector';
import toast from 'react-hot-toast';
import {useMutation} from 'react-query';
import {templateApiCall} from '@/redux/util';
import {AiToolService} from '@/service/ai-tool.service';

function Page() {
  const adminSessionSelector = useAdminSessionSelector();
  const currentCategoryInLocalStorage = localStorage.getItem(
    'category-creation-ai-tool',
  );

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<AiToolCreationInput>({
    resolver: yupResolver(aiToolCreationSchema),
  });

  const createAiToolMutation = useMutation({
    mutationFn: async (createAiToolRequest: CreateAiToolRequest) => {
      return await templateApiCall<CreateAiToolRequest, any>({
        request: createAiToolRequest,
        callback: async (request: CreateAiToolRequest) => {
          return await AiToolService.getInstance().create(request);
        },
        isProtected: true,
      });
    },
    onSuccess: () => {
      toast.success('Create ai tool successfully');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    },
    onError: () => {
      toast.error('Create ai tool failed');
    },
  });

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
        accessToken: adminSessionSelector.user.accessToken,
      };

      localStorage.setItem('category-creation-ai-tool', resultInput.category);
      createAiToolMutation.mutate(createAiToolRequest);
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
            <option
              key={option}
              value={option}
              selected={
                !!(
                  currentCategoryInLocalStorage &&
                  currentCategoryInLocalStorage === option
                )
              }>
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
        disabled={createAiToolMutation.isLoading}
        className={'bg-amber-100 py-3'}
        onClick={() => {
          addAiTool();
        }}>
        {createAiToolMutation.isLoading ? 'Adding the tool' : 'Submit'}
      </button>
    </div>
  );
}

export default Page;
