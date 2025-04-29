import { IPeriod } from '@/types/definations';
import connectToDatabase from '@/libs/db/mongodb';
import ApprovalData from '@/libs/db/schemas/ApprovalDataSchema';
import mongoose from 'mongoose';
import { getOrCreatePeriod } from '@/helpers/periodHelper';

export async function POST (request: Request) {
    try {
        const { dataSet, period: periodCode, orgUnit } = await request.json(); // Get request body
        
        if (!dataSet || !periodCode || !orgUnit ) {
            return Response.json({message: "Missing required fields: dataSet, period, and orgUnit. Please ensure all required fields are included in your request."}, {status: 500});
        }
        
        // Connect Mongodb
        await connectToDatabase();

        // Find period document by code and create if the period is not existed
        let periodDbObj: IPeriod = await getOrCreatePeriod(periodCode);
        
        const condition = {
            dataSet: new mongoose.Types.ObjectId(dataSet),
            period: periodDbObj._id,
            orgUnit: new mongoose.Types.ObjectId(orgUnit)
        };
                
        let result = await ApprovalData.findOne(condition)
                                        .populate( "approvedBy acceptedBy" );
        result = (result) ? result : {};

        return Response.json(result, {status: 200});
       
    }
    catch(error: any) {
        return Response.json({error: error.message}, {status: 500});
    }
}