'use client';
import React, {useEffect, useState} from 'react';
import {Fragment} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import {XMarkIcon} from '@heroicons/react/24/solid';
import ContentSideOverGetBlogs from '@/app-page-component/blog-section/source_blogs/slide-over-get-blogs/ContentSideOverGetBlogs';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import {useSystemSelector} from '@/redux/slices/system/system.selector';
import {toggleSideOverForGetBlogsBySourceBlog} from '@/redux/slices/system/system.slice';
import {useDispatch} from 'react-redux';
import {SourceBlog} from '@/types/api/source_blog';
import {useSourceBlogStateSelector} from '@/redux/slices/source_blog/source-blog-state/source-blog-state.selector';
import {setSourceBlog} from '@/redux/slices/source_blog/source-blog-state/source-blog-state.slice';
function SideOverGetBlogs() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const router = useRouter();

  const systemSelector = useSystemSelector();
  const sourceBlogState = useSourceBlogStateSelector();

  const [open, setOpen] = useState(
    systemSelector.sideOverForGetBlogsBySourceBlog,
  );

  const [sourceBlog, setSourceBlogInScope] = useState<SourceBlog | null>(
    sourceBlogState.currentSelectedSourceBlog,
  );

  useEffect(() => {
    setOpen(systemSelector.sideOverForGetBlogsBySourceBlog);
  }, [systemSelector.sideOverForGetBlogsBySourceBlog]);

  useEffect(() => {
    console.log('sideover get blogs');
    console.log(pathname);
    console.log(searchParams?.get('type_source'));
  }, [pathname]);

  const close = () => {
    if (pathname !== null && pathname !== undefined) {
      router.replace(pathname);
    }
    dispatch(setSourceBlog(null));
    dispatch(toggleSideOverForGetBlogsBySourceBlog(false));
  };
  if (sourceBlog === null) {
    console.log('source blog is null');
    dispatch(toggleSideOverForGetBlogsBySourceBlog(false));
    return null;
  } else {
    return (
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            close();
          }}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <div className="fixed inset-0" />

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full">
                  <Dialog.Panel className="pointer-events-auto w-screen bg-secondary max-w-2xl">
                    <div className="flex h-full flex-col overflow-y-scroll py-6 shadow-xl">
                      <div className="px-4 sm:px-6">
                        <div className="flex items-start justify-between">
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                              onClick={() => {
                                close();
                              }}>
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        {<ContentSideOverGetBlogs sourceBlog={sourceBlog} />}
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    );
  }
}

export default SideOverGetBlogs;
