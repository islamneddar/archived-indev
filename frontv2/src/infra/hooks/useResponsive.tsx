import {useMediaQuery} from 'react-responsive';

function useResponsive() {
  const isMobile = useMediaQuery({minWidth: 0, maxWidth: 425});
  const isTablet = useMediaQuery({minWidth: 426, maxWidth: 768});
  const isLaptop = useMediaQuery({minWidth: 769, maxWidth: 1024});
  const isDesktop = useMediaQuery({minWidth: 1025});

  const isMobileOrTablet = isMobile || isTablet;

  return {
    isMobile,
    isTablet,
    isLaptop,
    isDesktop,
    isMobileOrTablet,
  };
}
export default useResponsive;
