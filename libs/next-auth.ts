import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./prisma";
import EmailProvider from "next-auth/providers/email";
import { Resend } from "resend";
import { authConfig, emailConfig } from "./config";

const resend = new Resend(emailConfig.apiKey);

export const authOptions: NextAuthOptions = {
  secret: authConfig.secret,
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: authConfig.google.clientId,
      clientSecret: authConfig.google.clientSecret,
    }),
    EmailProvider({
      server: emailConfig.smtp,
      from: emailConfig.from.noReply,
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    redirect: async ({ url, baseUrl }) => {
      // Redirect to dashboard after login
      return baseUrl + "/dashboard";
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
  },
  theme: {
    brandColor: "#10b981", // Brand sea-green color
    // Remove logo to use clean text-based branding
    colorScheme: "dark",
  },
};

export default NextAuth(authOptions);
