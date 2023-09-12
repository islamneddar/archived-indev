'use client';
import React from 'react';
import PrimaryButton from '../../../components/button/PrimaryButton';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {LoginInput, loginSchema} from './login.form';
import toast from 'react-hot-toast';
import {signIn} from 'next-auth/react';
import {useRouter} from 'next/navigation';
import InputWithValidationError from '@/components/form/InputWithValidationErrorInnoom';
import {routingConstant} from '@/routing/routing.constant';

export default function LoginPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<LoginInput>({
    resolver: yupResolver(loginSchema),
  });

  const login = () => {
    const onSubmit = (resultInput: LoginInput) => {
      signIn('credentials', {
        email: resultInput.email,
        password: resultInput.password,
        redirect: false,
      }).then(value => {
        if (value?.ok) {
          router.push(routingConstant.admin.home.root);
        } else {
          toast.error('wrong email or password');
        }
      });
    };

    handleSubmit(onSubmit)();
  };

  return (
    <div className="bg-primary overflow-y-scroll w-screen h-screen scrollbar-hide">
      <div className="flex justify-center items-center h-full w-full">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 tn:mx-2">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="tn:text-18 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <InputWithValidationError
                  label={{
                    showLabel: true,
                    labelContent: 'Email',
                    className: 'text-white',
                  }}
                  type={'email'}
                  name={'email'}
                  id={'email'}
                  placeholder={'john.doe@gmail.com'}
                  isError={errors.email !== undefined}
                  inputClassName={
                    'px-2 border-gray-1 h-10 border-1 placeholder:text-gray-d4 placeholder:font-normal placeholder:text-18 w-96 h-10 text-black'
                  }
                  register={register('email')}
                  errorMessage={errors.email?.message}
                />
              </div>
              <div>
                <InputWithValidationError
                  label={{
                    showLabel: true,
                    labelContent: 'Password',
                    className: 'text-white',
                  }}
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
                    'px-2 border-gray-1 border-1 placeholder:text-gray-d4 placeholder:font-normal placeholder:text-18 text-black w-96 h-10 justify-center items-center'
                  }
                  register={register('password')}
                  errorMessage={errors.password?.message}
                />
              </div>
              <div className="flex w-full justify-center">
                <PrimaryButton
                  title="Login"
                  buttonClassName="w-full"
                  disabled={false}
                  loading={false}
                  onClick={() => {
                    login();
                  }}></PrimaryButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
