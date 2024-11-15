import React from 'react';
import classNames from 'classnames';
import {usePathname, useRouter} from 'next/navigation';
import {NavigationType} from '@/types/general/sidebar.type';
import {useUserSessionSelector} from '@/redux/slices/auth/user/user.selector';
import routing from '@/routes/routing.constant';

interface ISideBarItemProps {
  item: NavigationType;
}

function SideBarItem(props: ISideBarItemProps) {
  const pathname = usePathname();
  const pathnameSplited = pathname?.split('/');
  const secondPathname = pathnameSplited && pathnameSplited[2];

  const item = props.item;
  const itemHrefSplited = item.href.split('/');
  const secondItemHref = itemHrefSplited && itemHrefSplited[2];

  const userSessionSelector = useUserSessionSelector();
  const router = useRouter();

  const isCurrentPath = secondPathname === secondItemHref;

  return (
    <a
      className={classNames(
        isCurrentPath
          ? 'bg-gray-900 text-white'
          : 'text-gray-300 hover:bg-gray-700 hover:text-white',
        'group flex items-center rounded-md px-2 py-2 text-sm font-medium cursor-pointer line-clamp-1',
      )}
      key={item.name}
      onClick={() => {
        if (item.isAuth && !userSessionSelector.isAuthenticated) {
          window.location.href = routing.auth.login;
          return;
        }
        if (!isCurrentPath) {
          //window.location.href = item.href;
          router.push(item.href);
        }
      }}>
      {item.icon && (
        <item.icon
          className={classNames(
            isCurrentPath
              ? 'text-gray-300'
              : 'text-gray-400 group-hover:text-gray-300',
            'mr-3 h-6 w-6 flex-shrink-0 ',
          )}
          aria-hidden="true"
        />
      )}
      {item.name}{' '}
      <span className={'font-semibold'}>
        {item.extraData && item.extraData.numberOfTool
          ? `  (+${item.extraData.numberOfTool})`
          : ''}
      </span>
    </a>
  );
}

export default SideBarItem;
