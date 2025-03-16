import connectToDatabase from "@/libs/db/mongodb";
import OrgUnit from "@/libs/db/schemas/OrgUnitSchema";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    if (!id) {
        return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    }
    
    try {
        await connectToDatabase();
        const orgUnit = await OrgUnit.findById(id);
        
        return NextResponse.json(orgUnit, {status: 200});
    }
    catch(error) {
        console.error(`Error getting OrgUnit ${id}. DETAILS: `, error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}