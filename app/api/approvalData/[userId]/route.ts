import connectToDatabase from '@/libs/db/mongodb';
import ApprovalData from '@/libs/db/schemas/ApprovalDataSchema';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { userId: string } }) {
    const { userId } = params;
    
    try {
        // Connect Mongodb
        await connectToDatabase();
        
        let result = await ApprovalData.find({
                $or: [{ approvedBy: userId }, { acceptedBy: userId }]
            })
            .populate("dataSet period orgUnit approvedBy acceptedBy")
            .sort({ approvedDate: -1 });

        return NextResponse.json(result, {status: 200});
    }
    catch(error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}
