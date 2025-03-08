import DataSet from "@/libs/db/schemas/DatasetSchema";
import Mongodb from "@/libs/db/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, {params}: {params: any}) {
    const db = Mongodb.getInstance();
    await db.connect();
    
    const { searchParams } = request.nextUrl; // Extract query parameters
    const orgUnitId = searchParams.get("ou") // Get "ou" value
    
    let dataSets;
    
    // Get dataSets by orgUnitId
    if(orgUnitId) {
        dataSets = await DataSet.find({orgUnits: orgUnitId})
                        .populate("dataElements periodType");
    }
    // Get ALL dataSets
    else {
        dataSets = await DataSet.find()
                        .populate("dataElements periodType orgUnits");
    }
    
    // await db.disconnect();
    
    return NextResponse.json(dataSets, { status: 200 });
   
}