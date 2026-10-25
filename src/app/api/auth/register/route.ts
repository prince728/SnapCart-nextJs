import { NextRequest, NextResponse } from "next/server";
import userModel from "@/models/user.model";
import { connectDB } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const { email, name, password } = await req.json();

        if (!email || !name || !password) {
            return NextResponse.json({
                message: "Please provide all credential",
            }, {
                status: 400
            })
        }

        const existingUserByEmail = await userModel.findOne(email);

        if (existingUserByEmail) {
            return NextResponse.json({
                message: "user already exist with given credentials",
            }, {
                status: 400
            })
        }

        const hashedPassword = bcrypt.hash(password, 10);

        const user = await userModel.create({
            name,
            email,
            password: hashedPassword
        })

        return NextResponse.json({
            message: "user registed successfully",
            user
        }, {
            status: 200
        })

    } catch (error) {
        return NextResponse.json({
            message: `register error ${error}`
        }, {
            status: 500
        })
    }
}