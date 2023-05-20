declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      accessToken: string;
    };
  }
}
