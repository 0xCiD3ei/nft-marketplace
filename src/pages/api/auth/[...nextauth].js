import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from 'next-auth/providers/credentials';
import { ThirdwebAuthProvider } from "@thirdweb-dev/auth/next-auth";
import NextAuth from "next-auth";
import dbConnect from "src/lib/dbConnect";
import { UserModel } from "src/lib/models/user.model";
import {withSessionRoute} from "src/lib/middlewares/withSession";
import {ApiError} from "src/lib/errors/ApiError";
import {compare} from "bcrypt";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        await dbConnect();
        const user = await UserModel.findOne({email: credentials.email});
        
        if(!user) {
          throw new ApiError({
            code: 404,
            message: "User not found"
          })
        }
        
        const checkPassword = await compare(credentials.password, user.password);
        if(!checkPassword || credentials.email !== user.email) {
          throw new ApiError({
            code: 404,
            message: "Email or password mismatch"
          })
        }
        
        return user;
      }
    }),
    ThirdwebAuthProvider({
      domain: process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN || "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || "",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
    }),
  ],
  pages: {
    signIn: '/auth/login'
  },
  callbacks: {
    async signIn({ user, account, profile, email, credential }) {
      if (account.type === "oauth") {
        await signInWithOAuth({ account, profile });
        return true;
      }
      return true;
    },
    async jwt({token, trigger, session}) {
      return token;
    },
    async session({ session, token }) {
      return session;
    },
  },
};

export default NextAuth(authOptions);

async function signInWithOAuth({ account, profile }) {
  await dbConnect();

  const user = await UserModel.findOne({ email: profile.email });
  
  if (user) return;
  const newUser = await UserModel.create({
    fullName: profile.name,
    email: profile.email,
    avatar: profile.picture,
    provider: account.provider
  });
}
