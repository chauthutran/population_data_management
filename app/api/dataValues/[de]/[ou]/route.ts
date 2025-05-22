import connectToDatabase from '@/libs/db/mongodb';
import DataValue from '@/libs/db/schemas/DataValueSchema';
import Period from '@/libs/db/schemas/PeriodSchema';
import mongoose from 'mongoose';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ de: string; ou: string }> },
) {
    try {
        await connectToDatabase();
        const { de, ou } = await params;

        const dataElementIdObj = new mongoose.Types.ObjectId(de);
        const orgUnitObj = new mongoose.Types.ObjectId(ou);
        const dataValues = await DataValue.aggregate([
            {
              $match: {
                dataElement: dataElementIdObj,
                orgUnit: orgUnitObj,
              },
            },
            {
              $lookup: {
                from: "periods", // match your Period collection name
                localField: "period",
                foreignField: "_id",
                as: "period",
              },
            },
            { $unwind: "$period" },
            {
              $sort: {
                "period.code": -1, // sort by period.code descending
              },
            },
          ]);
          

        return Response.json(dataValues, { status: 200 });
    } catch (error: any) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await connectToDatabase();

        const {
            dataElements,
            period: periodCode,
            orgUnit,
        } = await request.json();
        if (!dataElements || !periodCode || !orgUnit) {
            return Response.json(
                { message: 'Missing required fields' },
                { status: 500 },
            );
        }

        // Find period document by code and create if the period is not existed
        let periodDbObj = await Period.findOne({ code: periodCode });
        if (!periodDbObj) return Response.json([], { status: 200 });

        const dataElementIdObjs = dataElements.map(
            (deId: string) => new mongoose.Types.ObjectId(deId),
        );
        const dataValues = await DataValue.find({
            dataElement: { $in: dataElementIdObjs },
            period: periodDbObj._id,
            orgUnit: new mongoose.Types.ObjectId(orgUnit),
        }).populate('dataElement');

        return Response.json(dataValues, { status: 200 });
    } catch (error: any) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}
