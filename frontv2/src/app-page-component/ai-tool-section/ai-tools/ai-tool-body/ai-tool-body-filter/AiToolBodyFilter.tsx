import React from 'react';
import AiToolBodyCategoryFilter from '@/app-page-component/ai-tool-section/ai-tools/ai-tool-body/ai-tool-body-filter/filters/AiToolBodyCategoryFilter';
import AiToolBodyPricingFilter from '@/app-page-component/ai-tool-section/ai-tools/ai-tool-body/ai-tool-body-filter/filters/AiToolBodyPricingFilter';

interface AiToolBodyFilterProps {
  category?: string;
}

function AiToolBodyFilter(props: AiToolBodyFilterProps) {
  return (
    <div className={'w-250 bg-gray-200 rounded-xl px-5 py-5 gap-4'}>
      <AiToolBodyCategoryFilter></AiToolBodyCategoryFilter>
      <div className={'pt-4'}>
        <AiToolBodyPricingFilter></AiToolBodyPricingFilter>
        {/*<PrimaryButton
          buttonClassName={'w-full relative bottom-0'}
          title={'Filter'}
          loading={false}
          disabled={false}></PrimaryButton>*/}
      </div>
    </div>
  );
}

export default AiToolBodyFilter;
