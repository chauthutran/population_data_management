import connectToDatabase from '@/libs/db/mongodb';
import User from '@/libs/db/schemas/UserSchema';
import { comparePassword } from '@/utils/encryptPassword';

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json(); // Get request body
        if (!email && !password) {
            return Response.json(
                { message: 'Missing required fields' },
                { status: 500 },
            );
        }

        await connectToDatabase();
        const searchResult = await User.findOne({ email });
        if (searchResult !== null) {
            let checkPassword = await comparePassword(
                password,
                searchResult.password,
            );
            if (checkPassword) {
                return Response.json(searchResult, { status: 200 });
            }
        }

        return Response.json(null, { status: 200 });
    } catch (error: any) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}
