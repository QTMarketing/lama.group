import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import AppleProvider from "next-auth/providers/apple";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  // Use NEXTAUTH_URL for local development to prevent URL construction errors
  ...(process.env.NEXTAUTH_URL && { url: process.env.NEXTAUTH_URL }),
  pages: {
    signIn: `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/login`,
    error: `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/login`,
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    AppleProvider({
      clientId: process.env.APPLE_ID!,
      clientSecret: process.env.APPLE_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        login: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        mode: { label: "Mode", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.login || !credentials?.password) return null;

        try {
          const base = process.env.NEXT_PUBLIC_WP_API;
          const apiKey = process.env.NEXT_PUBLIC_WP_HEADLESS_API_KEY;
          if (!base || !apiKey) {
            console.error("Missing NEXT_PUBLIC_WP_API or NEXT_PUBLIC_WP_HEADLESS_API_KEY");
            return null;
          }

          const response = await fetch(`${base}/lama/v1/auth/password-login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': apiKey,
            },
            body: JSON.stringify({
              login: String(credentials.login),
              password: String(credentials.password),
            }),
          });

          if (!response.ok) return null;
          const data = await response.json();
          if (!data?.success || !data?.user) return null;

          const user = data.user;
          return {
            id: String(user.id),
            email: String(user.email || ''),
            name: String(user.name || user.username || ''),
          };
        } catch (error) {
          console.error("Login error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.jwt = (user as any).jwt;
        token.refreshToken = (user as any).refreshToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).id = token.sub;
        (session as any).jwt = token.jwt;
        (session as any).refreshToken = token.refreshToken;
      }
      return session;
    },
  },
};
