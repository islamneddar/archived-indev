import React from 'react';
import AiToolBodyCategoryFilter from '@/app-page-component/ai-tool-section/ai-tools/ai-tool-body/ai-tool-body-filter/AiToolBodyCategoryFilter';
import AiToolBodyPricingFilter from '@/app-page-component/ai-tool-section/ai-tools/ai-tool-body/ai-tool-body-filter/AiToolBodyPricingFilter';

interface AiToolBodyFilterProps {
  category?: string;
}

function AiToolBodyFilter(props: AiToolBodyFilterProps) {
  return (
    <div className={'w-250 bg-gray-200 rounded px-2 py-3 gap-4'}>
      <AiToolBodyCategoryFilter></AiToolBodyCategoryFilter>
      <div className={'pt-4'}>
        <AiToolBodyPricingFilter></AiToolBodyPricingFilter>
      </div>
    </div>
  );
}

export default AiToolBodyFilter;
