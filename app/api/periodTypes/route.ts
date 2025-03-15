import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/libs/db/mongodb";
import PeriodType from "@/libs/db/schemas/PeriodTypeShema";

export async function GET(request: NextRequest) {
    
    await connectToDatabase();
    
    const dataSets = await PeriodType.find();
    
    return NextResponse.json(dataSets, { status: 200 });
   
}