import { NuxtAuthHandler } from '#auth';
import GithubProvider from 'next-auth/providers/github';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import { getMongoClient } from '~~/server/utils/authMongoClient';

const github = (GithubProvider as any).default || GithubProvider;

export default NuxtAuthHandler({
  // @ts-expect-error
  adapter: MongoDBAdapter(getMongoClient()),
  session: {
    strategy: 'jwt',
  },
  providers: [
    github({
      clientId: process.env.OAUTH_ID || useRuntimeConfig().public.OAUTH_ID,
      clientSecret: process.env.OAUTH_SECRET || useRuntimeConfig().private.OAUTH_SECRET,
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
