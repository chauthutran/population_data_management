import DataSet from '@/libs/db/schemas/DatasetSchema';
import connectToDatabase from '@/libs/db/mongodb';
import { NextRequest } from 'next/server';
import DataElement from '@/libs/db/schemas/DataElementSchema';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<any> },
) {
    await connectToDatabase();

    let dataElements = await DataElement.find();

    return Response.json(dataElements, { status: 200 });
}
