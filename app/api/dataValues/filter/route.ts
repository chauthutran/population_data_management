import connectToDatabase from '@/libs/db/mongodb';
import DataValue from '@/libs/db/schemas/DataValueSchema';
import Period from '@/libs/db/schemas/PeriodSchema';
import mongoose from 'mongoose';

export async function POST(request: Request) {
    try {
        await connectToDatabase();

        const {
            dataElement: dataElemenNames,
            periods: periodCodes,
            orgUnits: orgUnitNames,
        } = await request.json();
        if (!dataElemenNames || !periodCodes || !orgUnitNames) {
            return Response.json(
                { message: 'Missing required fields' },
                { status: 500 },
            );
        }

        const result = DataValue.aggregate([
            {
              $lookup: {
                from: 'dataelements',           // the MongoDB collection name
                localField: 'dataElement',      // field on DataValue
                foreignField: '_id',            // field on DataElement
                as: 'de'
              }
            },
            { $unwind: '$de' },
            // 2) Only keep the elements whose name is in our list
            { $match: { 'de.name': { $in: dataElemenNames } } },
            // 3) Join in OrgUnit
            {
              $lookup: {
                from: 'orgunits',
                localField: 'orgUnit',
                foreignField: '_id',
                as: 'ou'
              }
            },
            { $unwind: '$ou' },
            
            // 4) Filter by the org unit name
            { $match: { 'ou.name': {$in: orgUnitNames } } },
             // 5) Join in Period
            {
              $lookup: {
                from: 'periods',
                localField: 'period',
                foreignField: '_id',
                as: 'pe'
              }
            },
            { $unwind: '$pe' },
            // 6) Filter to only the codes we want
            { $match: { 'pe.code': { $in: periodCodes } } },
          
            // 7) Project the shape you want back
            {
              $project: {
                _id: 1,
                dataElement: '$de',
                period:      '$pe',
                orgUnit:     '$ou',
                value: 1
              }
            }
        ]);
        
        return Response.json(result, { status: 200 });
    } catch (error: any) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}
