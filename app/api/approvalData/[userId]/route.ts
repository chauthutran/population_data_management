import connectToDatabase from '@/libs/db/mongodb';
import ApprovalData from '@/libs/db/schemas/ApprovalDataSchema';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ userId: string }> },
) {
    const { userId } = await params;

    try {
        // Connect Mongodb
        await connectToDatabase();

        let result = await ApprovalData.find({
            $or: [{ approvedBy: userId }, { acceptedBy: userId }],
        })
            .populate('dataSet period orgUnit approvedBy acceptedBy')
            .sort({ approvedDate: -1 });

        return Response.json(result, { status: 200 });
    } catch (error: any) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}
