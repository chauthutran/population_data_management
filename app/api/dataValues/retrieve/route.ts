import connectToDatabase from "@/libs/db/mongodb";
import DataValue from "@/libs/db/schemas/DataValueSchema";
import Period from "@/libs/db/schemas/PeriodSchema";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        await connectToDatabase();
        
        const { dataElements, period: periodCode, orgUnit } = await request.json();
        if(!dataElements || !periodCode || !orgUnit) {
            return NextResponse.json({message: "Missing required fields"}, {status: 500});
        }

        // Find period document by code and create if the period is not existed
        let periodDbObj = await Period.findOne({code: periodCode});
        if (!periodDbObj) return  NextResponse.json([], {status: 200});

        const dataElementIdObjs = dataElements.map((deId: string) => new mongoose.Types.ObjectId(deId));
        const dataValues = await DataValue.find({
                                    dataElement: { $in: dataElementIdObjs},
                                    period: periodDbObj._id,
                                    orgUnit: new mongoose.Types.ObjectId(orgUnit),
                                })
                                .populate("dataElement");

        return NextResponse.json(dataValues, {status: 200});
    }
    catch(error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}