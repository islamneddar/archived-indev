export enum PricingEnum {
  FREE = 'free',
  PAID = 'paid',
  FREE_PLAN = 'free_plan',
  FREE_TRIAL = 'free_trial',
}

export const listAiPricing = {
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

export const getAiPricing = (type: PricingEnum) => {
  return listAiPricing[type];
};
