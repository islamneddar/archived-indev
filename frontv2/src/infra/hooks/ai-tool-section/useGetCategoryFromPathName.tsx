import {usePathname} from 'next/navigation';

function useGetCategoryFromPathName() {
  const pathname = usePathname();

  const partsPathname = pathname?.split('/');

  return partsPathname?.[partsPathname.length - 1];
}

export default useGetCategoryFromPathName;
