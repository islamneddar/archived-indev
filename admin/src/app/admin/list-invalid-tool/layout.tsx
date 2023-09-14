'use client';
import React, {useEffect} from 'react';
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

function Layout({children}: {children: React.ReactNode}) {
  const adminSelector = useAdminSessionSelector();
  const params = useSearchParams();
  const [listTools, setListTools] = React.useState<AiToolWithTotalNumber>({
    data: [],
    total: 0,
  });

  if (adminSelector.user.role !== 'admin') {
    return router.push(routingConstant.admin.home.root);
  }

  useEffect(() => {
    async function getListProduct(page: number) {
      const listTools = await AiToolService.getInstance().getAllInvalidTool(
        page,
        adminSelector.user.accessToken,
      );
      console.log(listTools);
      setListTools(listTools);
    }
    getListProduct(Number(params?.get('page')) || 1);

    return () => {
      console.log('unmount');
    };
  }, []);

  const imageBodyTemplate = (aiTool: AiTool) => {
    return (
      <img
        src={`${aiTool.image}`}
        alt={aiTool.image}
        className="w-6rem shadow-2 border-round w-10 h-10 cursor-pointer"
        onClick={() => {
          window.open(aiTool.image, '_blank');
        }}
      />
    );
  };

  const statusBodyTemplate = (aiTool: AiTool) => {
    return <Tag value={aiTool.pricing}></Tag>;
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

  const activatedToolBodyTemplate = (aiTool: AiTool) => {
    const [isActivated, setIsActivated] = React.useState<boolean>(
      aiTool.isActive,
    );
    return (
      <InputSwitch
        checked={isActivated}
        className={'h-5'}
        onChange={(e: any) => {
          setIsActivated(e.value);
        }}></InputSwitch>
    );
  };

  const header = (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <span className="text-xl text-900 font-bold">Products</span>
      <Button>refresh</Button>
    </div>
  );
  const footer = `In total there are ${
    listTools ? listTools.data.length : 0
  }/ ${listTools.total} products.`;

  return (
    <div>
      <DataTable value={listTools.data} header={header} footer={footer}>
        <Column field="name" header="Name"></Column>
        <Column
          field="isActivated"
          header="Activated"
          body={activatedToolBodyTemplate}></Column>
        <Column field={'description'} header={'Description'}></Column>
        <Column header="Image" body={imageBodyTemplate}></Column>
        <Column field="url" header="WebSite" body={webSiteTemplate}></Column>
        <Column field="category" header="Category"></Column>
        <Column header="Pricing" body={statusBodyTemplate}></Column>
        <Column
          field="createdAt"
          header="Created At"
          body={dateCreationBodyTemplate}></Column>
        <Column
          field="addedBy"
          header="Added By"
          body={AddedByTemplate}></Column>
      </DataTable>
    </div>
  );
}

export default Layout;
