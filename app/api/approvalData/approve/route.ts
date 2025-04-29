import { getOrCreatePeriod } from '@/helpers/periodHelper';
import connectToDatabase from '@/libs/db/mongodb';
import ApprovalData from '@/libs/db/schemas/ApprovalDataSchema';
import Period from '@/libs/db/schemas/PeriodSchema';
import mongoose from 'mongoose';

export async function POST (request: Request) {
    try {
        const { dataSet, period: periodCode, orgUnit, approvedBy } = await request.json(); // Get request body
        
        if(dataSet && periodCode && orgUnit && approvedBy) {
            await connectToDatabase();
    
            // Find period document by code and create if the period is not existed
            const periodObj = await getOrCreatePeriod(periodCode);
            
            const approvalData = {
                dataSet: new mongoose.Types.ObjectId(dataSet),
                period: periodObj._id,
                orgUnit: new mongoose.Types.ObjectId(orgUnit),
                approvedBy: new mongoose.Types.ObjectId(approvedBy),
                approvedDate: new Date(),
            };
            
            await ApprovalData.create(approvalData);
            
            // Get more details of approvedBy and acceptedBy information ( User info )
            const condition = {
                dataSet: new mongoose.Types.ObjectId(dataSet),
                period: periodObj._id,
                orgUnit: new mongoose.Types.ObjectId(orgUnit)
            };
                    
            const newApprovalData = await ApprovalData.findOne(condition)
                                            .populate( "approvedBy acceptedBy" );
            
            return Response.json(newApprovalData, {status: 200});
        }
        
        return Response.json(null, {status: 500});
    }
    catch(error: any) {
        return Response.json({error: error.message}, {status: 500});
    }
}

export async function DELETE (request: Request) {
    try {
        const { dataSet, period: periodCode, orgUnit } = await request.json(); // Get request body
        
        if (!dataSet || !periodCode || !orgUnit) {
            return Response.json({message: "Missing required fields"}, {status: 500});
        }
        
        // Connect Mongodb
        await connectToDatabase();

        // Convert IDs to ObjectId
        const dataSetIdObj = new mongoose.Types.ObjectId(dataSet);
        const orgUnitIdObj = new mongoose.Types.ObjectId(orgUnit);
        
        // Find period document by code and create if the period is not existed
        let periodDbObj = await Period.findOne({code: periodCode});
        if( periodDbObj === null ) return Response.json({message: "Approval data not found"}, {status: 404});
        
        // Find and delete the document
        const deletedApproval = await ApprovalData.findOneAndDelete(
            { dataSet: dataSetIdObj, period: periodDbObj._id, orgUnit: orgUnitIdObj}
        );
        
        if (!deletedApproval) {
            return Response.json({ message: "Approval data not found" }, { status: 404 });
        }
        
        return Response.json(null, { status: 200 });
    }
    catch(error: any) {
        return Response.json({message: error.message}, {status: 500});
    }
}