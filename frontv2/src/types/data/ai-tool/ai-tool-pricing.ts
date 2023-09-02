export enum PricingEnum {
  FREE = 'free',
  PAID = 'paid',
  FREE_PLAN = 'free_plan',
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
};

export const getAiPricing = (type: PricingEnum) => {
  return listAiPricing[type];
};
