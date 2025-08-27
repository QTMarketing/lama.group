import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

const LOGIN_MUTATION = `
  mutation Login($username: String!, $password: String!) {
    login(input: { username: $username, password: $password }) {
      authToken
      refreshToken
      user {
        databaseId
        name
        roles { nodes { name } }
      }
    }
  }
`;

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "WordPress",
      credentials: { username: { label: "Username" }, password: { label: "Password", type: "password" } },
      async authorize(creds) {
        if (!creds?.username || !creds?.password) return null;
        const res = await fetch(`${process.env.WP_URL}/graphql`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: LOGIN_MUTATION,
            variables: { username: creds.username, password: creds.password },
          }),
        });
        const json = await res.json();
        const login = json?.data?.login;
        if (!login?.authToken) return null;
        return {
          id: String(login.user.databaseId),
          name: login.user.name,
          roles: login.user.roles?.nodes?.map((r: any) => r.name) ?? [],
          accessToken: login.authToken,
          refreshToken: login.refreshToken,
        } as any;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = (user as any).id;
        token.name = (user as any).name;
        token.roles = (user as any).roles;
        token.accessToken = (user as any).accessToken;
        token.refreshToken = (user as any).refreshToken;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.sub as string,
        name: token.name as string,
        roles: (token.roles as string[]) ?? [],
      } as any;
      (session as any).accessToken = token.accessToken;
      return session;
    },
  },
  pages: { signIn: "/login" },
}; 