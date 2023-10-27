import * as yup from 'yup';

export interface EditAiProductInput {
  name: string;
  description: string;
  categoryId: number;
  pricingId: number;
  platformId: number;
}

export const editAiProductSchema = yup.object({
  name: yup.string().label('Name').required('Please enter your name'),
  description: yup
    .string()
    .label('Description')
    .required('Please enter your description'),
  categoryId: yup
    .number()
    .label('Category')
    .required('Please enter your category'),
  pricingId: yup
    .number()
    .label('Pricing')
    .required('Please enter your pricing'),
  platformId: yup
    .number()
    .label('Platform')
    .required('Please enter your platform'),
});
