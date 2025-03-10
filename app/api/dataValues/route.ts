import Mongodb from "@/libs/db/mongodb";
import DataValue from "@/libs/db/schemas/DataValueSchema";
import Period from "@/libs/db/schemas/PeriodSchema";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const db = Mongodb.getInstance();
        await db.connect();
        
        const {searchParams} = request.nextUrl;
        const action = searchParams.get("action");
        if (action && action === "loadData") {
            const { dataElements, period, orgUnit } = await request.json();
            if(dataElements && period && orgUnit) {
                // Find period document by name
                const periodObj = await Period.findOne({ name: period });
                const dataElementObjs = dataElements.map((deId: string) => new mongoose.Schema.ObjectId(deId));
                const orgUnitObj = new mongoose.Schema.ObjectId(orgUnit);
                
                const dataValues = await DataValue.find({
                        dataElement: { $in: dataElementObjs},
                        period: periodObj,
                        orgUnit: orgUnitObj,
                    })
                    .populate("dataElement period");
                
                NextResponse.json(dataValues, {status: 200});
            }
        }
        
        return NextResponse.json(null, {status: 500});
    }
    catch(error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}