import connectToDatabase from "@/libs/db/mongodb";
import DataValue from "@/libs/db/schemas/DataValueSchema";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { periods: periodCodes, dataElement: dataElementId, orgUnitLevel, orgUnit: orgUnitId } = await request.json(); // Get request body
        
        if (!periodCodes && !dataElementId && !orgUnitLevel && !orgUnitId) {
            return NextResponse.json({message: "Missing required fields"}, {status: 500});
        }
        
        await connectToDatabase();

        const dataValues = await DataValue.aggregate([
            {
                $lookup: {
                    from: "orgunits", // Join with the OrgUnit collection
                    localField: "orgUnit",
                    foreignField: "_id",
                    as: "orgUnitData"
                }
            },
            { $unwind: "$orgUnitData" },

            // **Find OrgUnits that belong to the specified orgUnitId**
            {
                $graphLookup: {
                    from: "orgunits",
                    startWith: "$orgUnitData._id",
                    connectFromField: "_id",
                    connectToField: "parent",
                    as: "orgUnitHierarchy"
                }
            },

            // **Filter by orgUnit level and hierarchy**
            {
                $match: {
                    "orgUnitData.level": orgUnitLevel,
                    "orgUnitHierarchy._id": new mongoose.Types.ObjectId(orgUnitId),
                    dataElement: new mongoose.Types.ObjectId(dataElementId),
                }
            },

            // **Lookup Period Data**
            {
                $lookup: {
                    from: "periods",
                    localField: "period",
                    foreignField: "_id",
                    as: "periodData"
                }
            },
            { $unwind: "$periodData" },

            // 🔹 **Filter by period code list**
            {
                $match: {
                    "periodData.code": { $in: periodCodes } // Match period codes
                }
            },

            // **Select Fields to Return**
            {
                $project: {
                    _id: 1,
                    value: 1,
                    "orgUnitData.name": 1,
                    "orgUnitData.level": 1,
                    "periodData.code": 1
                }
            }
        ]);
        
        return NextResponse.json(dataValues, {status: 200});
    }
    catch(error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}