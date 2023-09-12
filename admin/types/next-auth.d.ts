declare module 'next-auth' {
  interface DefaultSession {
    user: {
      id: string;
      email: string;
      username: string;
      accessToken: string;
    };
  }
}
