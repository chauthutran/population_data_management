import connectToDatabase from "@/libs/db/mongodb";
import User from "@/libs/db/schemas/UserSchema";
import { comparePassword } from "@/utils/encryptPassword";
import { NextRequest, NextResponse } from "next/server";

export async function POST (request: NextRequest) {
    try {
        const { email, password } = await request.json(); // Get request body
        if( !email && !password ) {
            return NextResponse.json({message: "Missing required fields"}, {status: 500});
        }
        
        await connectToDatabase();
        const searchResult = await User.findOne({email});
console.log(email);
        if( searchResult !== null ) {
            let checkPassword = await comparePassword(password, searchResult.password);
            if (checkPassword) {
                return NextResponse.json(searchResult, {status: 200});
            }
        }
        
        return NextResponse.json(null, {status: 200});
    }
    catch(error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}