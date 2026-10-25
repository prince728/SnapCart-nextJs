import { connectDB } from "@/lib/db";
import userModel from "@/models/user.model";
import bcrypt from "bcryptjs";
import { error } from "console";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: { label: "email", type: "email" },
                password: { label: "password", type: "password" },
            },

            async authorize(credentials, request) {
                await connectDB();
                const email = credentials.email;
                const password = credentials.password as string;

                const user = await userModel.findOne({ email });

                if (!user) {
                    throw new Error("user does not exist");
                }
                const isMatchedPassword = await bcrypt.compare(password, user.password);

                if (!isMatchedPassword) {
                    throw new Error("incorrect password");
                }

                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                    role: user.role

                };

            }
        })
    ],
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                token.id = user.id,
                    token.email = user.email,
                    token.name = user.name,
                    token.role = token.role
            }

            return token
        },
        session({ token, session }) {
            if (session.user) {
                session.user.id = token.id as string,
                session.user.email = token.email as string,
                session.user.name = token.name as string,
                session.user.role = token.role as string
            }

            return session
        },
    },
    pages:{
        signIn:"/login",
        error:"/login"
    },
    session:{
        strategy:"jwt",
        maxAge:10*24*60*60
    },
    secret:process.env.AUTH_SECRET

})
