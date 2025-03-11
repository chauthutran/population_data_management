import connectToDatabase from '@/libs/db/mongodb';
import ApprovalData from '@/libs/db/schemas/ApprovalDataSchema';
import Period from '@/libs/db/schemas/PeriodSchema';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

export async function POST (request: NextRequest) {
    try {
        const { dataSet, period: periodCode, orgUnit, approvedBy } = await request.json(); // Get request body
        
        if(dataSet && periodCode && orgUnit && approvedBy) {
            await connectToDatabase();
    
            // Find period document by name
            const periodObj = await Period.findOne({ code: periodCode });
            const approvalData = {
                dataSet: new mongoose.Types.ObjectId(dataSet),
                period: periodObj._id,
                orgUnit: new mongoose.Types.ObjectId(orgUnit),
                approvedBy: new mongoose.Types.ObjectId(approvedBy),
                approvedDate: new Date(),
            };
            
            const newApprovalData = await ApprovalData.create(approvalData);
            
            return NextResponse.json(newApprovalData, {status: 200});
        }
        
        return NextResponse.json(null, {status: 500});
    }
    catch(error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}