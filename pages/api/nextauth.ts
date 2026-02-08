import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../lib/prisma";
import bcrypt from "bcrypt";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({ where: { email: credentials?.email } });
        if (!user) return null;

        const isValid = credentials?.password ? await bcrypt.compare(credentials.password, user.password) : false;
        if (!isValid) return null;

        return { id: user.id, email: user.email, balance: user.balance, invested: user.invested };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.balance = user.balance;
        token.invested = user.invested;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.balance = token.balance as number;
        session.user.invested = token.invested as number;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
});



