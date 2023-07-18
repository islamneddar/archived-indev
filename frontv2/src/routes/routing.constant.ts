const routing = {
  root: '/',
  auth: {
    login: '/auth/login',
    signup: '/auth/signup',
  },
  blog: {
    root: '/blog',
    //home: '/blog/home',
    explore: '/blog/explore',
    homeRoutes: {
      search: '/blog/explore/search',
    },
    myFeed: '/blog/my-feed',
    followSource: {
      home: '/blog/follow-sources',
      feeds: (type: string) => `/blog/follow-sources/${type}`,
    },
    bookmark: '/blog/bookmark',
  },
};

export default routing;
