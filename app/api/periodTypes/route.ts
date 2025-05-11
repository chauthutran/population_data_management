import connectToDatabase from '@/libs/db/mongodb';
import PeriodType from '@/libs/db/schemas/PeriodTypeShema';

export async function GET(request: Request) {
    await connectToDatabase();

    const dataSets = await PeriodType.find();

    return Response.json(dataSets, { status: 200 });
}
