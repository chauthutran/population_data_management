import { getOrCreatePeriod } from '@/helpers/periodHelper';
import connectToDatabase from '@/libs/db/mongodb';
import DataValue from '@/libs/db/schemas/DataValueSchema';
import { IPeriod, JSONObject } from '@/types/definations';
import mongoose from 'mongoose';

export async function POST(request: Request) {
    try {
        await connectToDatabase();

        const dataValues = await request.json();

        await resolveDataValues(dataValues);

        const resultList = [];
        // Insert or update the data
        for (const dataValue of dataValues) {
            const filter = {
                period: dataValue.period,
                dataElement: dataValue.dataElement,
                orgUnit: dataValue.orgUnit,
            };

            // Check if the document with the same period, dataElement, and orgUnit exists
            const existingDataValue = await DataValue.findOne(filter);

            if (existingDataValue) {
                // If the document exists, update it with new values
                const update = {
                    $set: {
                        value: dataValue.value,
                    },
                };

                const updatedDataValue = await DataValue.findOneAndUpdate(
                    filter,
                    update,
                    { new: true },
                );
                resultList.push(updatedDataValue);
            } else {
                // If no document exists, create a new one
                const newDataValue = await DataValue.create(dataValue);
                resultList.push(newDataValue);
            }
        }

        return Response.json(resultList, { status: 200 });
    } catch (error: any) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}

const resolveDataValues = async (dataValues: JSONObject[]) => {
    // Find period document by code and create if the period is not existed
    let periodCodes = [...new Set(dataValues.map((item) => item.period))];
    const periodDbObjs = [];
    for (var i = 0; i < periodCodes.length; i++) {
        const periodDbObj = await getOrCreatePeriod(periodCodes[i]);
        periodDbObjs.push(periodDbObj);
    }

    // Convert array to object { id1: period, id2: period }
    const periodsMap = periodDbObjs.reduce(
        (acc, period: IPeriod) => {
            acc[period.code!] = period._id!;
            return acc;
        },
        {} as Record<string, string>,
    );

    dataValues.map((item) => {
        item.period = periodsMap[item.period];
        item.dataElement = new mongoose.Types.ObjectId(item.dataElement);
        item.orgUnit = new mongoose.Types.ObjectId(item.orgUnit);
        return item;
    });
};
