import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import AuthService from '@/services/auth.service';
// @ts-ignore
import {NextAuthOptions} from 'next-auth';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the signin form (e.g. "Sign in with...")
      name: 'Credentials',
      // `credentials` is used to generate a form on the signin page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {label: 'email', type: 'email', placeholder: 'email@gmail.com'},
        password: {label: 'Password', type: 'password'},
      },
      async authorize(credentials, req) {
        const {email, password} = credentials as any;
        const res = await AuthService.getInstance().login(email, password);
        if (res && res.userId) {
          return {
            id: res.userId.toString(),
            accessToken: res.accessToken,
          };
        } else return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/login',
  },
  secret: '0_JWT_SECRET',
  callbacks: {
    // @ts-ignore
    async jwt({token, user}) {
      return {...token, ...user};
    },
    // @ts-ignore
    async session({session, token}) {
      session.user = token as any;
      return session;
    },
  },
};

export default NextAuth(authOptions);
