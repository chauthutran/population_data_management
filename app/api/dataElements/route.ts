import DataSet from '@/libs/db/schemas/DatasetSchema';
import connectToDatabase from '@/libs/db/mongodb';
import { NextRequest } from 'next/server';
import DataElement from '@/libs/db/schemas/DataElementSchema';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<any> },
) {
    await connectToDatabase();

    let dataElements = await DataSet.aggregate(
        [
            {
              $lookup: {
                from: 'dataelements',
                localField: 'dataElements',
                foreignField: '_id',
                as: 'dataElements'
              }
            },
            {
              $lookup: {
                from: 'periodtypes',
                localField: 'periodType',
                foreignField: '_id',
                as: 'periodType'
              }
            },
            { $unwind: '$periodType' },
            { $unwind: '$dataElements' },
            {
              $replaceRoot: {
                newRoot: {
                  $mergeObjects: [
                    '$dataElements',
                    { periodType: '$periodType' }
                  ]
                }
              }
            }
          ]
    );

    return Response.json(dataElements, { status: 200 });
}
