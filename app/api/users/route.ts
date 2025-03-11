import connectToDatabase from "@/libs/db/mongodb";
import User from "@/libs/db/schemas/UserSchema";
import { comparePassword } from "@/ui/encryptPassword";
import { NextRequest, NextResponse } from "next/server";

export async function POST (request: NextRequest) {
    try {
        await connectToDatabase();
        
        const {searchParams} = request.nextUrl;
        const action = searchParams.get("action");
        if (action && action === "login") {
            const { email, password } = await request.json();
            if(email && password) {
                const searchResult = await User.findOne({email});
            
                if( searchResult !== null ) {
                    let checkPassword = await comparePassword(password, searchResult.password);
                    if (checkPassword) {
                        return NextResponse.json(searchResult, {status: 200});
                    }
                }
            }
        }
        
        return NextResponse.json(null, {status: 500});
    }
    catch(error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}