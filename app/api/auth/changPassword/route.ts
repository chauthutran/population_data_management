import connectToDatabase from "@/libs/db/mongodb";
import User from "@/libs/db/schemas/UserSchema";
import { comparePassword, hashPassword } from "@/utils/encryptPassword";
import { NextRequest, NextResponse } from "next/server";

export async function POST (request: NextRequest) {
    try {
        const { email, oldPassword, newPassword } = await request.json(); // Get request body
        if (!email && !oldPassword && !newPassword) {
            return NextResponse.json({message: "Missing required fields"}, {status: 500});
        }
        
        await connectToDatabase();
        const foundUser = await User.findOne({email});
        if( foundUser !== null ) {
            let validPassword = await comparePassword(oldPassword, foundUser.password);
            if (validPassword) {
                // Hash(encrypt) new password before updated
                const hashedNewPassword = await hashPassword( newPassword );
                const updatedUser = await User.findByIdAndUpdate(
                    foundUser._id, 
                    { password: hashedNewPassword },
                    { new: true } // Return the updated user
                );
                
                return { success: true, message: "Password updated successfully" };
            }
            
            return NextResponse.json({error: `Password is wrong`}, {status: 401});
        }
        
        return NextResponse.json({error: `User ${email} not found.`}, {status: 404});
    }
    catch(error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}