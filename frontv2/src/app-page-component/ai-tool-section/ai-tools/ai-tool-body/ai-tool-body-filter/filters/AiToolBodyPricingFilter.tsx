import React from 'react';
import {LocalStorageService} from '@/infra/external-service/local-storage/local-storage.service';

function AiToolBodyPricingFilter() {
  const aiToolPricing = LocalStorageService.getInstance().getPriceAiToolMap();
  return (
    <div>
      <h2 className={'text-black text-md'}>Pricing </h2>
      <div className={'max-h-180 flex flex-col '}>
        {
          // @ts-ignore
          Object.keys(aiToolPricing).map(key => {
            const value = aiToolPricing?.[key];
            if (value) {
              return (
                <div
                  className={'flex items-center py-1'}
                  key={value.aiToolPricingId}>
                  <input
                    id="comments"
                    aria-describedby="comments-description"
                    name="comments"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 cursor-pointer mr-2"
                  />
                  <label className={'text-black text-sm'}>{value.name}</label>
                </div>
              );
            }
            return null;
          })
        }
      </div>
    </div>
  );
}

export default AiToolBodyPricingFilter;
