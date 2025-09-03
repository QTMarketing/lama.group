import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import AppleProvider from "next-auth/providers/apple";
import FacebookProvider from "next-auth/providers/facebook";
import Credentials from "next-auth/providers/credentials";

const WP_API_BASE = process.env.WP_API_BASE!;
const WP_HEADLESS_API_KEY = process.env.WP_HEADLESS_API_KEY!;

async function wpUpsertUser(user: { email: string; name?: string; provider?: string; providerAccountId?: string; username?: string }) {
  try {
    const res = await fetch(`${WP_API_BASE}/lama/v1/auth/upsert`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-lama-api-key": WP_HEADLESS_API_KEY },
      body: JSON.stringify(user),
    });
    
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.error("Failed to upsert user in WordPress:", errorData);
    }
  } catch (error) {
    console.error("Error calling WordPress upsert endpoint:", error);
  }
}

async function wpPasswordLogin(login: string, password: string) {
  console.log("NextAuth wpPasswordLogin called with:", { login, password: "***" });
  console.log("WP_API_BASE:", WP_API_BASE);
  console.log("WP_HEADLESS_API_KEY:", WP_HEADLESS_API_KEY ? "SET" : "NOT SET");
  
  const res = await fetch(`${WP_API_BASE}/lama/v1/auth/password-login`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json", 
      "x-api-key": WP_HEADLESS_API_KEY 
    },
    body: JSON.stringify({ login, password }), // WordPress now expects 'login' field
  });
  
  console.log("NextAuth login response status:", res.status);
  
  if (!res.ok) {
    // WordPress now returns structured error responses with codes
    const errorData = await res.json().catch(() => ({}));
    console.log("NextAuth login failed:", errorData);
    return null;
  }
  
  const data = await res.json();
  console.log("NextAuth login success:", data);
  
  // Return user data in format expected by NextAuth
  return {
    id: data.user?.id,
    email: data.user?.email,
    name: data.user?.name,
  };
}

async function wpVerifyOtp(email: string, code: string, name?: string, username?: string) {
  const res = await fetch(`${WP_API_BASE}/lama/v1/auth/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-lama-api-key": WP_HEADLESS_API_KEY },
    body: JSON.stringify({ email, code, name, username }),
  });
  if (!res.ok) return null;
  return await res.json();
}

const providers: any[] = [];
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(GoogleProvider({ clientId: process.env.GOOGLE_CLIENT_ID!, clientSecret: process.env.GOOGLE_CLIENT_SECRET! }));
}
if (process.env.APPLE_CLIENT_ID && process.env.APPLE_TEAM_ID && process.env.APPLE_KEY_ID && process.env.APPLE_PRIVATE_KEY) {
  providers.push(AppleProvider({
    clientId: process.env.APPLE_CLIENT_ID!,
    clientSecret: process.env.APPLE_CLIENT_SECRET!,
  }));
}
if (process.env.FACEBOOK_CLIENT_ID && process.env.FACEBOOK_CLIENT_SECRET) {
  providers.push(FacebookProvider({ clientId: process.env.FACEBOOK_CLIENT_ID!, clientSecret: process.env.FACEBOOK_CLIENT_SECRET! }));
}

providers.push(Credentials({
  id: "credentials",
  name: "Email/Username login or OTP",
  credentials: { login: {}, password: {}, code: {}, name: {}, username: {}, mode: {} },
  async authorize(credentials) {
    console.log("NextAuth authorize called with:", { 
      mode: credentials?.mode, 
      login: credentials?.login, 
      hasPassword: !!credentials?.password 
    });
    
    const mode = String(credentials?.mode || "password");
    
    // Defensive checks to prevent invalid URL construction
    if (mode === "password") {
      // Validate required fields before making any requests
      if (!credentials?.login || !credentials?.password) {
        console.error("NextAuth: Missing login or password");
        throw new Error("Missing login or password");
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/lama/v1/auth/password-login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_WP_HEADLESS_API_KEY || ""
        },
        body: JSON.stringify({
          login: credentials.login,
          password: credentials.password
        })
      });

      if (!res.ok) return null;
      const data = await res.json();
      if (!data?.success) return null;

      return {
        id: data.user.id,
        name: data.user.username,
        email: data.user.email
      };
    }
    
    if (mode === "otp") {
      const login = String(credentials?.login || "").trim();
      const name = credentials?.name ? String(credentials.name) : undefined;
      const username = credentials?.username ? String(credentials.username) : undefined;
      const email = login.includes("@") ? login : String((credentials as any)?.loginEmail || "");
      
      if (!email || !credentials?.code) {
        console.error("NextAuth: Missing email or OTP code");
        return null;
      }
      const user = await wpVerifyOtp(email, String(credentials.code), name, username);
      return user;
    }
    
    return null;
  },
}));

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  // Use NEXTAUTH_URL for local development to prevent URL construction errors
  ...(process.env.NEXTAUTH_URL && { url: process.env.NEXTAUTH_URL }),
  pages: {
    signIn: `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/login`,
    error: `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/login`,
  },
  providers,
  callbacks: {
    async signIn({ user, account, profile }) {
      if (user?.email) {
        await wpUpsertUser({
          email: user.email,
          name: user.name || (profile as any)?.name,
          provider: account?.provider,
          providerAccountId: account?.providerAccountId,
        });
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) { token.email = (user as any).email; token.name = (user as any).name; }
      return token;
    },
    async session({ session, token }) {
      if (token?.email) session.user = { ...session.user, email: token.email as any, name: token.name as any } as any;
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Ensure we always return a valid absolute URL
      if (url.startsWith("http")) {
        return url;
      }
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      }
      return baseUrl;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }; 