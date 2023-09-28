import {PricingEnum} from '@/infra/enums/ai-tool/pricing-mode.enum';

export const listAiPricing = {
  [PricingEnum.ALL]: {
    type: PricingEnum.ALL,
    name: 'ALL',
  },
  [PricingEnum.FREE]: {
    type: PricingEnum.FREE,
    name: 'Free',
  },
  [PricingEnum.PAID]: {
    type: PricingEnum.PAID,
    name: 'Paid',
  },
  [PricingEnum.FREE_PLAN]: {
    type: PricingEnum.FREE_PLAN,
    name: 'Free plan',
  },
  [PricingEnum.FREE_TRIAL]: {
    type: PricingEnum.FREE_TRIAL,
    name: 'Free trial',
  },
};

export const getAiPricingByType = (type: PricingEnum) => {
  return listAiPricing[type];
};

export const getListAiPricingMode = () => {
  return Object.keys(listAiPricing).map(aiPricing => ({
    name: listAiPricing[aiPricing as PricingEnum].name,
    type: listAiPricing[aiPricing as PricingEnum].type,
  }));
};
