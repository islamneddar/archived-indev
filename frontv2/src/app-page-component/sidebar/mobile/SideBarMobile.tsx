import React, {Fragment} from 'react';
import {SideBarDesktopProps} from '@/app-page-component/sidebar/SideBarMain';
import {useDispatch} from 'react-redux';
import {useSystemSelector} from '@/redux/system/system.selector';
import {Dialog, Menu, Transition} from '@headlessui/react';
import {toggleSideBarMobile} from '@/redux/system/system.slice';
import {XMarkIcon} from '@heroicons/react/24/solid';
import SideBarItem from '@/app-page-component/sidebar/desktop/SideBarItem';
import LogoContainer from '@/app-page-component/navbar/LogoContainer';
function SideBarMobile(props: SideBarDesktopProps) {
  const dispatch = useDispatch();
  const systemSelector = useSystemSelector();

  const updateSideBarMobileOpen = (isOpen: boolean) => {
    dispatch(toggleSideBarMobile(isOpen));
  };
  return (
    <div>
      <Transition.Root show={systemSelector.sideBarMobileEnabled} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 lg:hidden"
          onClose={() => {
            updateSideBarMobileOpen(false);
          }}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full">
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0">
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button
                      type="button"
                      className="-m-2.5 p-2.5"
                      onClick={() => {
                        updateSideBarMobileOpen(false);
                      }}>
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-primary px-6 pb-4">
                  <nav className="flex flex-1 flex-col">
                    <div className={'mt-5'}>
                      <LogoContainer></LogoContainer>
                    </div>
                    <ul role="list" className="flex flex-1 flex-col mt-4">
                      {props.navigation.map(item => {
                        return (
                          <SideBarItem
                            key={item.name}
                            item={item}></SideBarItem>
                        );
                      })}
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}

export default SideBarMobile;
