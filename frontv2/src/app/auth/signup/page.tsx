'use client';
import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import PrimaryButton from '../../../components/button/PrimaryButton';
import {SignupInput, signupSchema} from './signup.form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useDispatch} from 'react-redux';
import toast from 'react-hot-toast';
import {useRouter} from 'next/navigation';
import {signupThunk} from '@/redux/auth/signup/signup.thunk';
import InputWithValidationError from '@/components/form/InputWithValidationErrorInnoom';
import {ThunkDispatch} from '@reduxjs/toolkit';
import CheckBoxWithValidationError from '@/components/form/CheckBoxWithValidationError';
import routing from '@/routes/routing.constant';
import {useSignupSelector} from '@/redux/auth/signup/sigup.selector';

export default function SignupPage() {
  const router = useRouter();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const {error, loading, success} = useSignupSelector();

  useEffect(() => {
    if (error !== undefined) {
      toast.error(error);
      return;
    }
    if (success) {
      router.push(routing.auth.login);
    }
  }, [error, router, success]);

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<SignupInput>({
    resolver: yupResolver(signupSchema),
  });

  const signup = () => {
    const onSubmit = (resultInput: SignupInput) => {
      console.log(resultInput);
      const {acceptConditionAndTerm, ...signupRequest} = resultInput;
      dispatch(signupThunk(signupRequest));
    };
    handleSubmit(onSubmit)();
  };

  return (
    <div className=" bg-primary fixed inset-0 overflow-y-scroll">
      <div className="flex flex-1 justify-center items-center h-full">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign up your new account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <InputWithValidationError
                  label={{showLabel: true, labelContent: 'Username'}}
                  type={'text'}
                  name={'username'}
                  id={'username'}
                  placeholder={'john doe'}
                  isError={errors.username !== undefined}
                  inputClassName={
                    'border-gray-1 border-1 placeholder:text-gray-d4 placeholder:font-normal placeholder:text-18 w-96 h-10 p-2 text-black'
                  }
                  register={register('username')}
                  errorMessage={errors.username?.message}
                />
              </div>
              <div>
                <InputWithValidationError
                  label={{showLabel: true, labelContent: 'Email'}}
                  type={'email'}
                  name={'email'}
                  id={'email'}
                  placeholder={'john.doe@gmail.com'}
                  isError={errors.email !== undefined}
                  inputClassName={
                    'border-gray-1 border-1 placeholder:text-gray-d4 placeholder:font-normal placeholder:text-18 w-96 h-10 p-2 text-black'
                  }
                  register={register('email')}
                  errorMessage={errors.email?.message}
                />
              </div>
              <div>
                <InputWithValidationError
                  label={{showLabel: true, labelContent: 'Password'}}
                  hint={{
                    showHint: false,
                    hintContent: 'Forgot password ?',
                    classNameHintContent: 'text-blue-secondary cursor-pointer',
                  }}
                  type={'password'}
                  name={'password'}
                  id={'password'}
                  placeholder={'**********'}
                  isError={errors.password !== undefined}
                  inputClassName={
                    'border-gray-1 border-1 placeholder:text-gray-d4 placeholder:font-normal placeholder:text-18 w-96 h-10 p-2 text-black'
                  }
                  register={register('password')}
                  errorMessage={errors.password?.message}
                />
              </div>
              <CheckBoxWithValidationError
                register={register('acceptConditionAndTerm')}
                id={'acceptConditionAndTerm'}
                name={'acceptConditionAndTerm'}
                isError={errors.acceptConditionAndTerm !== undefined}
                label={'Accept Term of Condition And Privacy Policy'}
                errorMessage={errors.acceptConditionAndTerm?.message}
              />
              <div className="flex items-center justify-between"></div>
              <div className="flex w-full justify-center">
                <PrimaryButton
                  title="Signup"
                  buttonClassName="w-full"
                  disabled={loading}
                  loading={loading}
                  onClick={() => {
                    signup();
                  }}></PrimaryButton>
              </div>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                you have already an account?{' '}
                <a
                  href={routing.auth.login}
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                  Login
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
