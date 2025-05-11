import { getOrCreatePeriod } from '@/helpers/periodHelper';
import connectToDatabase from '@/libs/db/mongodb';
import ApprovalData from '@/libs/db/schemas/ApprovalDataSchema';
import Period from '@/libs/db/schemas/PeriodSchema';
import { IPeriod } from '@/types/definations';
import mongoose from 'mongoose';

export async function POST(request: Request) {
    try {
        const {
            dataSet,
            period: periodCode,
            orgUnit,
            acceptedBy,
        } = await request.json(); // Get request body

        if (!dataSet || !periodCode || !orgUnit || !acceptedBy) {
            return Response.json(
                { message: 'Missing required fields' },
                { status: 500 },
            );
        }

        // Connect Mongodb
        await connectToDatabase();

        // Convert IDs to ObjectId
        const dataSetIdObj = new mongoose.Types.ObjectId(dataSet);
        const orgUnitIdObj = new mongoose.Types.ObjectId(orgUnit);
        const acceptedByIdObj = new mongoose.Types.ObjectId(acceptedBy);

        // Find period document by code and create if the period is not existed
        let periodDbObj: IPeriod = await getOrCreatePeriod(periodCode);

        // Find and update the document
        let updatedApproval = await ApprovalData.findOneAndUpdate(
            {
                dataSet: dataSetIdObj,
                period: periodDbObj._id,
                orgUnit: orgUnitIdObj,
            }, // Search criteria
            {
                acceptedBy: acceptedByIdObj,
                acceptedDate: new Date(),
                updatedAt: new Date(), // Update timestamp
            },
            { new: true }, // Return updated document
        );

        if (!updatedApproval) {
            return Response.json(
                { message: 'Approval data not found' },
                { status: 404 },
            );
        }

        // Get more details of approvedBy and acceptedBy information ( User info )
        const condition = {
            dataSet: new mongoose.Types.ObjectId(dataSet),
            period: periodDbObj._id,
            orgUnit: new mongoose.Types.ObjectId(orgUnit),
        };

        updatedApproval = await ApprovalData.findOne(condition).populate(
            'approvedBy acceptedBy',
        );
        return Response.json(updatedApproval, { status: 200 });
    } catch (error: any) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { dataSet, period: periodCode, orgUnit } = await request.json(); // Get request body

        if (!dataSet || !periodCode || !orgUnit) {
            return Response.json(
                { message: 'Missing required fields' },
                { status: 500 },
            );
        }

        // Connect Mongodb
        await connectToDatabase();

        // Convert IDs to ObjectId
        const dataSetIdObj = new mongoose.Types.ObjectId(dataSet);
        const orgUnitIdObj = new mongoose.Types.ObjectId(orgUnit);

        // Find period document by code and create if the period is not existed
        let periodDbObj = await Period.findOne({ code: periodCode });
        if (periodDbObj === null)
            return Response.json(
                { message: 'Approval data not found' },
                { status: 404 },
            );

        // Find and update the document (remove acceptedBy and acceptedDate)
        let updatedApproval = await ApprovalData.findOneAndUpdate(
            {
                dataSet: dataSetIdObj,
                period: periodDbObj._id,
                orgUnit: orgUnitIdObj,
            },
            {
                $unset: { acceptedBy: '', acceptedDate: '' }, // Unset the fields (remove acceptedBy and acceptedDate from the document)
                updatedAt: new Date(), // Update timestamp
            },
            { new: true }, // Return updated document
        );

        if (!updatedApproval) {
            return Response.json(
                { message: 'Approval data not found' },
                { status: 404 },
            );
        }

        // Get more details of approvedBy and acceptedBy information ( User info )
        const condition = {
            dataSet: new mongoose.Types.ObjectId(dataSet),
            period: periodDbObj._id,
            orgUnit: new mongoose.Types.ObjectId(orgUnit),
        };

        updatedApproval = await ApprovalData.findOne(condition).populate(
            'approvedBy acceptedBy',
        );
        return Response.json(updatedApproval, { status: 200 });
    } catch (error: any) {
        return Response.json({ message: error.message }, { status: 500 });
    }
}
