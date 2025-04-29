import connectToDatabase from "@/libs/db/mongodb";
import User from "@/libs/db/schemas/UserSchema";
import { hashPassword } from "@/utils/encryptPassword";

export async function POST (request: Request) {
    try {
        const { email, password } = await request.json(); // Get request body
        if (!email && !password) {
            return Response.json({message: "Missing required fields"}, {status: 500});
        }
        
        await connectToDatabase();
        // Hash(encrypt) password before creating
        const hashedPassword = await hashPassword( password );

        const newUser = await User.create({email, hashedPassword});

        return Response.json(newUser, { status: 200 })
    }
    catch(error: any) {
        return Response.json({error: error.message}, {status: 500});
    }
}