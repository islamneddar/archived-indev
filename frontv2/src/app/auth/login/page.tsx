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
import routing from '@/routes/routing.constant';

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
          router.push(routing.blog.root);
        } else {
          toast.error('wrong email or password');
        }
      });
    };

    handleSubmit(onSubmit)();
  };

  return (
    <div className=" bg-primary fixed inset-0 overflow-y-scroll">
      <div className="flex flex-1 justify-center items-center h-full">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <InputWithValidationError
                  label={{showLabel: true, labelContent: 'Email'}}
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
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300">
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
                  Forgot password?
                </a>
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
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{' '}
                <a
                  href={routing.auth.signup}
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
