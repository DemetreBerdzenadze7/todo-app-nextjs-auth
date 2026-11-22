import { getUsers } from "@/lib/users";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {},
        password: {},
      },

      async authorize(credentials) {
        const users = await getUsers();
        const user = users.find(
          (item) =>
            item.name === credentials?.username &&
            item.password === credentials.password,
        );

        if (!user) return null;

        const { password, ...rest } = user;
        return rest;
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.name = user.name;
        token.role = user.role;
      }

      return token;
    },

    async session({ token, session }) {
      session.user.id = token.sub ?? "";
      session.user.name = token.name;
      session.user.role = token.role;
      return session;
    },
  },
};

export default options;
