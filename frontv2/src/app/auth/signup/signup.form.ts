import * as yup from 'yup';

export interface SignupInput {
  email: string;
  password: string;
  username: string;
  acceptConditionAndTerm: boolean;
}

export const signupSchema = yup.object({
  email: yup
    .string()
    .label('Email')
    .email('the email is wrong')
    .required('please enter your email'),
  password: yup
    .string()
    .required('please enter your password')
    .min(8, 'password minimum length is 8'),
  username: yup.string().required('username is required'),
  acceptConditionAndTerm: yup
    .boolean()
    .oneOf(
      [true],
      'You must accept the terms of conditions and the privacy policy.',
    )
    .required(),
});
