import Mongodb from '@/libs/db/mongodb';
import ApprovalData from '@/libs/db/schemas/ApprovalDataSchema';
import DataSet from '@/libs/db/schemas/DatasetSchema';
import Period from '@/libs/db/schemas/PeriodSchema';
import { IApprovalData } from '@/types/definations';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

export async function POST (request: NextRequest) {
    try {
        const db = Mongodb.getInstance();
        await db.connect();
        
        const {searchParams} = request.nextUrl;
        const action = searchParams.get("action");
        if (action && action === "approve") {
            const { dataSet, period, user } = await request.json();
            if(dataSet && period && user) {
                // Find period document by name
                const periodObj = await Period.findOne({ name: period });
                const dataSetObj = new mongoose.Schema.ObjectId(dataSet);
                const userObj = new mongoose.Schema.ObjectId(user);
                
                const approvalData = {
                    dataSet: dataSetObj,
                    period: periodObj,
                    approvedBy: userObj,
                    approvedDate: new Date(),
                };
                
                const newApprovalData = await ApprovalData.create(approvalData);
                
                NextResponse.json(newApprovalData, {status: 200});
            }
        }
        
        return NextResponse.json(null, {status: 500});
    }
    catch(error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}