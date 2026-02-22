import { NuxtAuthHandler } from '#auth';
import GithubProvider from 'next-auth/providers/github';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import client from '~~/server/plugins/db';

const github = (GithubProvider as any).default || GithubProvider;

export default NuxtAuthHandler({
  // @ts-expect-error
  adapter: MongoDBAdapter(client),
  session: {
    strategy: 'jwt',
  },
  providers: [
    github({
      clientId: process.env.GITHUB_ID || useRuntimeConfig().public.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET || useRuntimeConfig().private.GITHUB_SECRET,
      httpOptions: {
        family: 4,
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.userId = account.providerAccountId;
      }
      return token;
    },
    async session({ session, token }) {
      if (!token) {
        console.warn('⚠️ Session callback: token is undefined');
        return session;
      }
      // @ts-expect-error
      session.userId = token.userId;
      return session;
    },
  },
  secret: process.env.NUXT_SECRET || useRuntimeConfig().private.NUXT_SECRET,
});
