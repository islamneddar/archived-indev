import * as yup from "yup";

export interface AiToolCreationInput {
    name: string;
    description: string;
    url: string;
    category: string;
    pricing: string;
    file: any;
}

export const aiToolCreationSchema = yup.object({
    name: yup
        .string()
        .label('Name')
        .required('Please enter your name'),
    description: yup
        .string()
        .label('Description')
        .required('Please enter your description'),
    url: yup
        .string()
        .label('URL')
        .required('Please enter your URL'),
    category: yup
        .string()
        .label('Category')
        .required('Please enter your category'),
    pricing: yup
        .string()
        .label('Pricing')
        .required('Please enter your pricing'),
    file: yup
        .mixed()
        .label('File')
        .required('Please enter your file'),
})