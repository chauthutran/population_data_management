import { queryWitAi } from '@/utils/witaiUtils';

export async function POST(request: Request) {
    try {
        const { message } = await request.json();
        if (!message) {
            return Response.json({ error: "Missing message"}, { status: 400 });
        }
        
        const witResponse = await queryWitAi(message);
        return Response.json({ wit: witResponse}, { status: 200 });
    } catch (error: any) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}
