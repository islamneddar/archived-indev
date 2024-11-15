'use client';
import React from 'react';
import {useAdminSessionSelector} from '@/redux/slices/auth/admin/admin.selector';
import {routingConstant} from '@/routing/routing.constant';
import {router} from 'next/client';
import {DataTable} from 'primereact/datatable';
import {useSearchParams} from 'next/navigation';
import {AiToolService} from '@/service/ai-tool.service';
import {AiTool, AiToolWithTotalNumber} from '@/types/api/ai-tool';
import {Button} from 'primereact/button';
import {Column} from 'primereact/column';
import {Tag} from 'primereact/tag';
import {InputSwitch} from 'primereact/inputswitch';
import toast from 'react-hot-toast';
import ImageDialog from '@/app-components/list-ai-tool/ImageDialog';
import {Tooltip} from 'primereact/tooltip';
import ConfirmDeleteDialog from '@/app-components/list-ai-tool/ConfirmDeleteDialog';
import {useMutation, useQuery} from 'react-query';
import EditAiProductDialog from '@/app-components/list-ai-tool/edit-ai-product-dialog/EditAiProductDialog';

interface LayoutState {
  enabledQuery: boolean;
  listTools: AiToolWithTotalNumber;
  loading: boolean;
  currentOpenedImage: string;
  page?: number;
  imageOpenInDialog: boolean;
  currentAiToolToDelete?: AiTool | null;
  currentAiToolToUpdate?: AiTool | null;
}
function Layout({children}: {children: React.ReactNode}) {
  const adminSelector = useAdminSessionSelector();
  const params = useSearchParams();

  const [state, setState] = React.useState<LayoutState>({
    enabledQuery: true,
    listTools: {
      data: [],
      total: 0,
    },
    loading: false,
    currentOpenedImage: '',
    page: Number(params?.get('page')) || 1,
    imageOpenInDialog: false,
    currentAiToolToDelete: null,
    currentAiToolToUpdate: null,
  });

  const [showConfirmDeleteDialog, setShowConfirmDeleteDialog] =
    React.useState<boolean>(false);

  const [showEditAiToolDialog, setShowEditAiToolDialog] =
    React.useState<boolean>(false);

  useQuery(
    ['getListProductNotAlreadyConfirmedByAdmin'],
    async () => {
      const currentPage = state.page || 1;
      const listTools =
        await AiToolService.getInstance().getAllNotConfirmedByAdminTools(
          currentPage,
          adminSelector.user.accessToken,
        );
      setState(prevState => ({
        ...prevState,
        listTools: listTools,
        enabledQuery: false,
      }));
    },
    {
      keepPreviousData: true,
      enabled: state.enabledQuery,
    },
  );

  const confirmToolMutation = useMutation({
    mutationFn: async (aiTool: AiTool) => {
      await AiToolService.getInstance().confirmTool(
        aiTool.aiToolId,
        adminSelector.user.accessToken,
      );
    },
    onSuccess: (data, context) => {
      const listToolsFiltred = state.listTools.data.filter(
        tool => tool.aiToolId !== context.aiToolId,
      );
      setState(prevState => ({
        ...prevState,
        listTools: {
          data: listToolsFiltred,
          total: state.listTools.total - 1,
        },
      }));
    },
    onError: (error: any) => {
      toast.error(error);
    },
  });

  const deleteToolMutation = useMutation({
    mutationFn: async (aiTool: AiTool) => {
      console.log('launch api call');
      await AiToolService.getInstance().deleteTool(
        aiTool.aiToolId,
        adminSelector.user.accessToken,
      );
    },
    onSuccess: (data, context) => {
      const listToolsFiltred = state.listTools.data.filter(
        tool => tool.aiToolId !== context.aiToolId,
      );
      setState(prevState => ({
        ...prevState,
        listTools: {
          data: listToolsFiltred,
          total: state.listTools.total - 1,
        },
        currentAiToolToDelete: null,
      }));
    },
    onError: (error: any) => {
      console.log(error);
      //toast.error(error);
      setState(prevState => ({
        ...prevState,
        currentAiToolToDelete: null,
      }));
    },
  });

  // UI

  if (adminSelector.user.role !== 'admin') {
    return router.push(routingConstant.admin.home.root);
  }

  const imageBodyTemplate = (aiTool: AiTool) => {
    return (
      <img
        src={`${aiTool.image}`}
        alt={aiTool.image}
        className="w-6rem shadow-2 border-round w-10 h-10 cursor-pointer"
        onClick={() => {
          setState(prevState => ({
            ...prevState,
            currentOpenedImage: aiTool.image,
            imageOpenInDialog: true,
          }));
        }}
      />
    );
  };

  const statusBodyTemplate = (aiTool: AiTool) => {
    return (
      <Tag value={aiTool.aiToolPricing ? aiTool.aiToolPricing.type : '-'}></Tag>
    );
  };

  const webSiteTemplate = (aiTool: AiTool) => {
    return (
      <a
        href={aiTool.url}
        target="_blank"
        rel="noreferrer"
        className="text-blue-500 hover:underline">
        {aiTool.url}
      </a>
    );
  };

  const dateCreationBodyTemplate = (aiTool: AiTool) => {
    return new Date(aiTool.createdAt).toLocaleDateString();
  };

  const AddedByTemplate = (aiTool: AiTool) => {
    return aiTool.admin.email;
  };

  const confirmToolBodyTemplate = (aiTool: AiTool) => {
    const [isActivated, setIsActivated] = React.useState<boolean>(
      aiTool.isConfirmedByAdmin,
    );
    return (
      <InputSwitch
        checked={isActivated}
        className={'h-5'}
        disabled={confirmToolMutation.isLoading}
        onChange={async (e: any) => {
          confirmToolMutation.mutate(aiTool);
        }}></InputSwitch>
    );
  };

  const descriptionBodyTemplate = (aiTool: AiTool) => {
    return (
      <>
        <Tooltip target={'.description-list-invalid-tool-layout'}></Tooltip>
        <div
          className="text-sm description-list-invalid-tool-layout"
          data-pr-tooltip={`${aiTool.description}`}
          data-pr-position="right"
          data-pr-at="right+5 top"
          data-pr-my="left center-2">
          {aiTool.description.length > 50
            ? aiTool.description.substring(0, 50) + '...'
            : aiTool.description}
        </div>
      </>
    );
  };

  const softDeletedBodyTemplate = (aiTool: AiTool) => {
    return (
      <Button
        style={{
          padding: '0.5rem 0.5rem',
        }}
        label={'Delete'}
        onClick={() => {
          setState(prevState => ({
            ...prevState,
            currentAiToolToDelete: aiTool,
          }));
          setShowConfirmDeleteDialog(true);
        }}></Button>
    );
  };

  const editBodyTemplate = (aiTool: AiTool) => {
    return (
      <Button
        style={{
          padding: '0.5rem 0.5rem',
        }}
        label={'Edit'}
        onClick={() => {
          setState(prevState => ({
            ...prevState,
            currentAiToolToUpdate: aiTool,
          }));
          setShowEditAiToolDialog(true);
        }}></Button>
    );
  };

  const header = (
    <>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-xl text-900 font-bold">Products</span>
        <Button>refresh</Button>
      </div>
      <div>
        In total there are {state.listTools ? state.listTools.data.length : 0}/
        {state.listTools.total} products.
      </div>
    </>
  );
  const footer = `In total there are ${
    state.listTools ? state.listTools.data.length : 0
  }/ ${state.listTools.total} products.`;

  const confirmDeleteDialogFooter = (
    <div>
      <Button
        label="No"
        icon="pi pi-times"
        onClick={() => setShowConfirmDeleteDialog(false)}
        className="p-button-text"
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        onClick={() => {
          // todo mutation to delete the tool
          if (!state.currentAiToolToDelete) return;
          deleteToolMutation.mutate(state.currentAiToolToDelete);
          setShowConfirmDeleteDialog(false);
        }}
        autoFocus
      />
    </div>
  );

  return (
    <div>
      <ImageDialog
        imageOpenInDialog={state.imageOpenInDialog}
        imageUrl={state.currentOpenedImage}
        setState={setState}
      />
      <ConfirmDeleteDialog
        visible={showConfirmDeleteDialog}
        setVisible={setShowConfirmDeleteDialog}
        footerContent={confirmDeleteDialogFooter}
      />
      <EditAiProductDialog
        currentAiToolToUpdate={
          state.currentAiToolToUpdate ? state.currentAiToolToUpdate : undefined
        }
        visible={showEditAiToolDialog}
        setVisible={setShowEditAiToolDialog}
        postEditSuccess={aiTool => {
          const listToolsFiltred = state.listTools.data.filter(
            tool => tool.aiToolId !== aiTool.aiToolId,
          );
          setState(prevState => ({
            ...prevState,
            listTools: {
              data: [...listToolsFiltred, aiTool],
              total: state.listTools.total,
            },
            currentAiToolToUpdate: null,
          }));
        }}
      />
      <DataTable
        value={state.listTools.data}
        header={header}
        footer={footer}
        scrollable={true}
        paginator={true}
        rows={100}
        rowsPerPageOptions={[5, 10, 25, 50]}>
        <Column
          field="softdelete"
          header="Soft Delete"
          body={softDeletedBodyTemplate}
        />
        <Column
          field="softdelete"
          header="Soft Delete"
          body={editBodyTemplate}
        />
        <Column field="name" header="Name" sortable={true} />
        <Column
          field="isConfirmedByAdmin"
          header="Confirm"
          body={confirmToolBodyTemplate}
        />
        <Column
          field={'description'}
          header={'Description'}
          body={descriptionBodyTemplate}
        />
        <Column header="Image" body={imageBodyTemplate} />
        <Column field="url" header="WebSite" body={webSiteTemplate} />
        <Column
          field="category"
          header="Category"
          body={(aiTool: AiTool) => {
            return <Tag value={aiTool.aiToolCategory?.name}></Tag>;
          }}
        />
        <Column header="Pricing" body={statusBodyTemplate} />
        <Column
          field="createdAt"
          header="Created At"
          body={dateCreationBodyTemplate}
        />
        <Column field="addedBy" header="Added By" body={AddedByTemplate} />
      </DataTable>
    </div>
  );
}

export default Layout;
