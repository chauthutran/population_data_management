// import * as tf from '@tensorflow/tfjs-node';
import { Predictor } from '@/libs/aiml/predictor';
import connectToDatabase from '@/libs/db/mongodb';
import DataValue from '@/libs/db/schemas/DataValueSchema';
import { IDataValue, IPeriod, JSONObject } from '@/types/definations';
import { roundNumber } from '@/utils/numberUtils';
import * as tf from '@tensorflow/tfjs';

export async function POST(request: Request) {
    try {
        const { deNames, peCodes, orgUnitNames } = await request.json();
        const dataValues: IDataValue[] = await retrieveDataValues({deNames, peCodes, orgUnitNames});
        const groupedData = groupDataValues(dataValues);
        
        await tf.ready();
        const predictor = new Predictor();
        
        for( var i=0; i<orgUnitNames.length; i++) {
            const ouName = orgUnitNames[i];
            
            for( var j=0; j<deNames.length; j++ ) {
                const deName = deNames[j];
                const dataValuesByOuAndDe = getDataValuesbByOuAndDe(ouName, deName, dataValues);
                const futurePeriods = getFurturePeriodsByOuName(peCodes, dataValuesByOuAndDe);
             
                const trainedData = dataValuesByOuAndDe.map((dv: IDataValue) => parseFloat(dv.value));
                await predictor.train(trainedData);
                
                // Predict next 'periods" periods, e.g. 5 years, 5 months, ...
                let sequence = [...trainedData];
                const predictionValues: Partial<Record<string, JSONObject>> = {};

                // Predict next 'periods" periods, e.g. 5 years, 5 months, ...
                for (let k = 0; k < futurePeriods.length; k++) {
                    const next = predictor.predictNext(sequence);
                    sequence.push(next);
                    
                    const futurePeriodCode = futurePeriods[k];
                    predictionValues[futurePeriodCode] = { value: roundNumber(next), predited: true};
                }
                
                insertPeriodValuesToGroup({
                    groupedData,
                    ouName,
                    deName,
                    periodValues: predictionValues
                })
            }
           
        }
        
        return Response.json(groupedData, { status: 200 });
    } catch (error: any) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}

const getDataValuesbByOuAndDe = (ouName: string, deName: string, dataValues: IDataValue[] ) : IDataValue[] => {
    const dvList = dataValues.filter((item: IDataValue) => item.orgUnit.name === ouName && item.dataElement.name === deName);
    return dvList.sort((a, b) =>  a.period.code.localeCompare(b.period.code));
}

const getFurturePeriodsByOuName = (peCodes: string[], dataValuesByOuAndDe: IDataValue[]): string[] => {
    console.log("=== orgUnitDataValues", dataValuesByOuAndDe);
     
    const sortedList = dataValuesByOuAndDe.sort((a, b) => {
        return a.period.code.localeCompare(b.period.code);
    });

    if(sortedList.length >= 3) { // Only data value list is more than 3, we can do predict
        const latestDataValue = sortedList[sortedList.length - 1];
        return peCodes.filter((peCode: string) => peCode > latestDataValue.period.code);
    }
    
    return [];
}

const insertPeriodValuesToGroup = (
{
    groupedData,
    ouName,
    deName,
    periodValues,
}: {
    groupedData: JSONObject,
    ouName: string,
    deName: string,
    periodValues: Partial<Record<string, JSONObject>> // Example: { "2026": 21.5, "2027": 22.0 }
}) => {
    // Ensure orgUnit bucket exists
    if (!groupedData[ouName]) {
        groupedData[ouName] = {};
    }

    // Ensure dataElement bucket exists
    if (!groupedData[ouName][deName]) {
        groupedData[ouName][deName] = {};
    }
  
    // Add each periodCode:value to the existing group
    for (const [periodCode, value] of Object.entries(periodValues)) {
        groupedData[ouName][deName][periodCode] = value;
    }
}

/**
 * 
 * @returns {
 *  <oU-name-1>: {
 *         <data element 1>: {
 *              <period 1>: { value: <data value 1>}, // for prediction values, need to add prop 'predited' as true
 *              <period 2>: { value: <data value 2>},
 *              ...
 *          },
 *          ...
 *  },
 *  ...
 * }
 */
const groupDataValues = (dataValues: IDataValue[]): JSONObject => {
    return dataValues.reduce<JSONObject>((acc, dv) => {
        const ouName  = dv.orgUnit.name;
        const deName  = dv.dataElement.name;
        const pCode   = dv.period.code;
        const val     = dv.value;
    
        // ensure orgUnit bucket
        if (!acc[ouName]) {
            acc[ouName] = {};
        }
    
        // ensure dataElement bucket
        if (!acc[ouName][deName]) {
            acc[ouName][deName] = {};
        }
    
        // set the period→value mapping
        acc[ouName][deName][pCode] = {value: val };
    
        return acc;
    }, {});
}


const retrieveDataValues = async ({
    deNames, 
    peCodes, 
    orgUnitNames
}: {
    deNames: string[], 
    peCodes: string[], 
    orgUnitNames: string[],
}): Promise<IDataValue[]> => {
     try {
        await connectToDatabase();

        if (!deNames || !peCodes || !orgUnitNames) {
            throw new Error ('Missing required fields');
        }

        const result = await DataValue.aggregate([
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
            { $match: { 'de.name': { $in: deNames } } },
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
            { $match: { 'pe.code': { $in: peCodes } } },
          
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
        
        return result;
    } catch (error: any) {
        throw new Error(error.message);
    }
}