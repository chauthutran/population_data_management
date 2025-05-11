import connectToDatabase from '@/libs/db/mongodb';
import OrgUnit from '@/libs/db/schemas/OrgUnitSchema';
import mongoose from 'mongoose';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> },
) {
    const { id } = await params;
    if (!id) {
        return Response.json({ error: 'Missing ID' }, { status: 400 });
    }

    try {
        await connectToDatabase();
        const orgUnit = await OrgUnit.findById(id);

        return Response.json(orgUnit, { status: 200 });
    } catch (error) {
        console.error(`Error getting OrgUnit ${id}. DETAILS: `, error);
        return Response.json(
            { error: 'Internal Server Error' },
            { status: 500 },
        );
    }
}
