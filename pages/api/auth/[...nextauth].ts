import NextAuth from "next-auth";
import { FirestoreAdapter } from "@next-auth/firebase-adapter";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { firebaseConfig } from "@/config/firebase";

export default NextAuth({
  adapter: FirestoreAdapter(firebaseConfig),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
});
