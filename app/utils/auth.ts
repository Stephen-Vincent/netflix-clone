// configure our auth options, github, google and email
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./db";
import { NextAuthOptions } from "next-auth";

export const authOptions = {
    adapter: PrismaAdapter(prisma) as any,
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
          }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
          }),
        EmailProvider({
            server: {
              host: process.env.EMAIL_SERVER_HOST,
              port: process.env.EMAIL_SERVER_PORT,
              auth: {
                user: process.env.EMAIL_SERVER_USER,
                pass: process.env.EMAIL_SERVER_PASSWORD
              }
            },
            from: process.env.EMAIL_FROM
          }),
    ]
} satisfies NextAuthOptions;