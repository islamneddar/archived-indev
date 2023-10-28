'use client';
import React from 'react';
import {
  AiTool,
  AiToolCategory,
  AiToolPlatform,
  AiToolPricing,
} from '@/types/api/ai-tool';
import {Dialog} from 'primereact/dialog';
import {useForm} from 'react-hook-form';
import {
  EditAiProductInput,
  editAiProductSchema,
} from '@/app-components/list-ai-tool/edit-ai-product-dialog/edit-ai-product-dialog.form';
import {yupResolver} from '@hookform/resolvers/yup';
import {templateApiCall} from '@/redux/util';
import {useMutation} from 'react-query';
import {AiToolService} from '@/service/ai-tool.service';
import toast from 'react-hot-toast';
import {useAdminSessionSelector} from '@/redux/slices/auth/admin/admin.selector';

interface EditAiProductDialogProps {
  visible: boolean;
  setVisible: (value: boolean) => void;
  currentAiToolToUpdate?: AiTool;
  postEditSuccess: (aiTool: AiTool) => void;
}

function EditAiProductDialog(props: EditAiProductDialogProps) {
  const aiTool = props.currentAiToolToUpdate;
  if (!aiTool) {
    props.setVisible(false);
    return <></>;
  }

  const userAdminSelector = useAdminSessionSelector();

  const editAiToolMutation = useMutation({
    mutationFn: async (editAiToolRequest: {[key: string]: any}) => {
      return await templateApiCall<{[key: string]: any}, any>({
        request: editAiToolRequest,
        callback: async (request: {[key: string]: any}) => {
          return await AiToolService.getInstance().update(request);
        },
        isProtected: false,
      });
    },
    onSuccess: (aiTool: AiTool) => {
      console.log(aiTool);
      props.postEditSuccess(aiTool);
      props.setVisible(false);
    },
    onError: () => {
      toast.error('update ai tool failed');
    },
  });

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<EditAiProductInput>({
    resolver: yupResolver(editAiProductSchema),
  });

  const mapCategory = JSON.parse(localStorage.getItem('mapCategory') ?? '{}');
  const listCategory = Object.values(mapCategory) as AiToolCategory[];

  const mapPricing = JSON.parse(localStorage.getItem('mapPricing') ?? '{}');
  const listPricing = Object.values(mapPricing) as AiToolPricing[];

  const mapPlatforms = JSON.parse(localStorage.getItem('mapPlatforms') ?? '{}');
  const listPlatforms = Object.values(mapPlatforms) as AiToolPlatform[];

  const onSubmit = (resultInput: EditAiProductInput) => {
    console.log('onSubmit');
    let editableData: {[key: string]: any} = {
      aiToolId: aiTool.aiToolId,
    };
    if (resultInput.name !== aiTool.name) {
      editableData['name'] = resultInput.name;
    }
    if (resultInput.description !== aiTool.description) {
      editableData['description'] = resultInput.description;
    }
    if (resultInput.categoryId !== aiTool.aiToolCategory?.aiToolCategoryId) {
      editableData['aiToolCategoryId'] = resultInput.categoryId;
    }
    if (resultInput.pricingId !== aiTool.aiToolPricing?.aiToolPricingId) {
      editableData['aiToolPricingId'] = resultInput.pricingId;
    }
    if (resultInput.platformId !== aiTool.aiToolPlatform?.aiToolPlatformId) {
      editableData['aiToolPlatformId'] = resultInput.platformId;
    }
    if (resultInput.featuresText !== aiTool.featuresText) {
      editableData['featuresText'] = resultInput.featuresText;
    }

    editAiToolMutation.mutate({
      editableData: editableData,
      accessToken: userAdminSelector.user.accessToken,
    });
  };

  return (
    <Dialog
      onHide={() => props.setVisible(false)}
      visible={props.visible}
      style={{width: '75vw'}}>
      <h1 className={'font-bold text-xl'}>
        {' '}
        Edit content of ai tool : {aiTool.name}
      </h1>
      <div className={'flex flex-col gap-y-2'}>
        <div className={'flex flex-col py-2'}>
          <label htmlFor="name">Name : </label>
          <input
            type="text"
            id="name"
            defaultValue={aiTool.name}
            className={'border border-gray-800 p-2'}
            {...register('name')}
          />
        </div>
        <div className={'flex flex-col py-2'}>
          <label htmlFor="description" className={'py-2'}>
            Description :{' '}
          </label>
          <textarea
            id="description"
            defaultValue={aiTool.description}
            className={'border border-gray-800 p-2'}
            {...register('description')}
          />
        </div>
        <div className={'flex flex-col py-2'}>
          <label htmlFor="featuresText" className={'py-2'}>
            Features :{' '}
          </label>
          <textarea
            rows={4}
            id="featuresText"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            defaultValue={aiTool.featuresText}
            {...register('featuresText')}
          />
        </div>
        <div className={'flex flex-col py-2'}>
          <label htmlFor="category" className={'py-2'}>
            Category :{' '}
          </label>
          <select
            id="category"
            className="mt-2 block w-full rounded-md border-black border-1 py-2 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
            {...register('categoryId')}>
            {listCategory.map(category => {
              return (
                <option
                  key={category.aiToolCategoryId}
                  selected={
                    !!aiTool.aiToolCategory &&
                    aiTool.aiToolCategory?.type === category.type
                  }
                  value={category.aiToolCategoryId}>
                  {category.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className={'flex flex-col py-2'}>
          <label htmlFor="pricing" className={'py-2'}>
            Pricing :{' '}
          </label>
          <select
            id="pricing"
            className="mt-2 block w-full rounded-md border-black border-1 py-2 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
            {...register('pricingId')}>
            {listPricing.map(pricing => {
              return (
                <option
                  key={pricing.aiToolPricingId}
                  selected={
                    !!aiTool.aiToolPricing &&
                    aiTool.aiToolPricing?.type === pricing.type
                  }
                  value={pricing.aiToolPricingId}>
                  {pricing.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className={'flex flex-col py-2'}>
          <label htmlFor="platforms" className={'py-2'}>
            Platforms :{' '}
          </label>
          <select
            id="platforms"
            className="mt-2 block w-full rounded-md border-black border-1 py-2 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
            {...register('platformId')}>
            {listPlatforms.map(platform => {
              return (
                <option
                  key={platform.aiToolPlatformId}
                  selected={
                    !!aiTool.aiToolPlatform &&
                    aiTool.aiToolPlatform?.type === platform.type
                  }
                  value={platform.aiToolPlatformId}>
                  {platform.name}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div
        className={
          'flex flex-row gap-x-2 justify-center items-center py-2 mt-2'
        }>
        <button
          type={'button'}
          className={
            'rounded bg-indigo-600 px-3 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-full'
          }
          onClick={() => {
            handleSubmit(onSubmit)();
          }}>
          <span>Save</span>
        </button>
      </div>
    </Dialog>
  );
}

export default EditAiProductDialog;
