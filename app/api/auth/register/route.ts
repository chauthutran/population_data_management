import connectToDatabase from "@/libs/db/mongodb";
import User from "@/libs/db/schemas/UserSchema";
import { comparePassword, hashPassword } from "@/utils/encryptPassword";
import { NextRequest, NextResponse } from "next/server";

export async function POST (request: NextRequest) {
    try {
        const { email, password } = await request.json(); // Get request body
        if (!email && !password) {
            return NextResponse.json({message: "Missing required fields"}, {status: 500});
        }
        
        await connectToDatabase();
        // Hash(encrypt) password before creating
        const hashedPassword = await hashPassword( password );

        const newUser = await User.create({email, hashedPassword});

        return NextResponse.json(newUser, { status: 200 })
    }
    catch(error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}