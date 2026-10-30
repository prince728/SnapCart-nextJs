import { auth } from "@/app/auth";
import { connectDB } from "@/lib/db";
import userModel from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const { role, mobile } = await req.json();
        const session = await auth();

        const user = await userModel.findOneAndUpdate({ email: session?.user?.email }, { role: role, mobile: mobile }, { new: true });

        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
                message: "User role updated successfully",
                user
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Error editing user role: " + error },
            { status: 500 }
        );
    }
}