import React from 'react';
import classNames from 'classnames';
import {usePathname, useRouter} from 'next/navigation';
import {NavigationType} from '@/types/general/sidebar.type';
import {useUserSessionSelector} from '@/redux/auth/user/user.selector';
interface ISideBarItemProps {
  item: NavigationType;
}

function SideBarItem(props: ISideBarItemProps) {
  const pathname = usePathname();
  const item = props.item;
  const userSessionSelector = useUserSessionSelector();
  const router = useRouter();

  return (
    <button
      className={classNames(
        pathname?.includes(item.href)
          ? 'bg-gray-900 text-white'
          : 'text-gray-300 hover:bg-gray-700 hover:text-white',
        'group flex items-center rounded-md px-2 py-2 text-sm font-medium cursor-pointer w-full',
      )}
      key={item.name}
      onClick={() => {
        if (item.isAuth && !userSessionSelector.isAuthenticated) {
          //window.location.href = routing.auth.login;
          //router.push(routing.auth.login);
          console.debug('go to login');
          return;
        }
        if (!pathname?.includes(item.href)) {
          //window.location.href = item.href;
          router.push(item.href, {
            forceOptimisticNavigation: true,
          });
          //window.history.pushState(null, '', item.href);
        }
      }}>
      <item.icon
        className={classNames(
          pathname?.includes(item.href)
            ? 'text-gray-300'
            : 'text-gray-400 group-hover:text-gray-300',
          'mr-3 h-6 w-6 flex-shrink-0',
        )}
        aria-hidden="true"
      />
      {item.name}
    </button>
  );
}

export default SideBarItem;
