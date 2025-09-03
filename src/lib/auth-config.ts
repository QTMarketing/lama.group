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
        if (!credentials?.login || !credentials?.password) {
          return null;
        }

        try {
          // Simple WordPress REST API login
          const response = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/wp/v2/users/me`, {
            method: 'GET',
            headers: {
              'Authorization': `Basic ${btoa(`${credentials.login}:${credentials.password}`)}`,
            },
          });

          if (response.ok) {
            const user = await response.json();
            return {
              id: user.id.toString(),
              email: user.email,
              name: user.name,
            };
          }
        } catch (error) {
          console.error("Login error:", error);
        }

        return null;
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
