import connectToDatabase from "@/libs/db/mongodb";
import DataValue from "@/libs/db/schemas/DataValueSchema";
import Period from "@/libs/db/schemas/PeriodSchema";
import { generatePeriodByCode } from "@/utils/periodUtils";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        await connectToDatabase();
        
        const {searchParams} = request.nextUrl;
        const action = searchParams.get("action");
        if (action && action === "loadData") {
            const { dataElements, period: periodCode, orgUnit } = await request.json();
            if(dataElements && periodCode && orgUnit) {
                // Find period document by name
                let periodDbObj = await Period.findOne({ code: periodCode });
                // Create a new period if it does not exist in mongodb
                if (periodDbObj === null) {
                    periodDbObj = await Period.create(generatePeriodByCode(periodCode));
                    console.log(periodDbObj);
                }
                
                const dataElementIdObjs = dataElements.map((deId: string) => new mongoose.Types.ObjectId(deId));
                
                const dataValues = await DataValue.find({
                        dataElement: { $in: dataElementIdObjs},
                        period: periodDbObj._id,
                        orgUnit: new mongoose.Types.ObjectId(orgUnit),
                    })
                    .populate("dataElement");
                return NextResponse.json(dataValues, {status: 200});
            }
        }
        
        return NextResponse.json([], {status: 200});
    }
    catch(error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}