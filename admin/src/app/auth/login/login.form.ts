import * as yup from 'yup';

export interface LoginInput {
  email: string;
  password: string;
}

export const loginSchema = yup.object({
  email: yup
    .string()
    .label('Email')
    .email('the email is wrong')
    .required('please enter your email'),
  password: yup
    .string()
    .required('please enter your password')
    .min(8, 'password minimum length is 8'),
});
