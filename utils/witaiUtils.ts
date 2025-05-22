import { IPeriod, JSONObject } from "@/types/definations";
import { generatePeriodByCode } from "./periodUtils";

const WITAI_TOKEN = process.env.WIT_AI_TOKEN; // store in .env.local

export const queryWitAi = async (message: string): Promise<JSONObject> => {
    try {
        const witRes = await fetch(
            `https://api.wit.ai/message?q=${encodeURIComponent(message)}`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${WITAI_TOKEN}`,
                    'Content-Type': 'application/json',
                },
            },
        );

        return await witRes.json();
    } catch (error) {
        console.error('Wit.ai error:', error);
        throw error;
    }
};

export const extractDataFormWitResponse = (witData: JSONObject): JSONObject => {
    const periods = getPeriodsFromWitAi(witData);
    const dataElements = extractDataElements(witData);
    const orgUnits = extractOrgUnits(witData);
    
    return { periods, dataElements, orgUnits };
}



// ------------------------------------------------------------------------------------------------------------------
// Supportive methods

const getPeriodsFromWitAi = (witData: JSONObject) => {
    const periods: IPeriod[] = [];
    const { number, dateRange, duration } = extractPeriodDataFromWitResponse(witData);
    
    // [{ grain: "month / year", value: "2024-01-01T00:00:00.000-08:00" }, ...]
    if (number) {
        number.forEach((item: JSONObject) => {
            periods.push(createPeriod(item));
        });
    }
    
    if(dateRange) {
        // [ {"from": { "grain": "year", "value": "2026-01-01T00:00:00.000-08:00"},
        //     "to": { "grain": "year", "value": "2030-01-01T00:00:00.000-08:00"}}, ...]
        dateRange.forEach((item: JSONObject) => {
            periods.push(createPeriod(item.from));
            periods.push(createPeriod(item.to));
        });
    }
    // Not support yet
    if(duration) {
        //[{ "grain": "month / year"; value: <a number> }]
        
    }
    
    return removeDuplicatePeriods(periods);
}

const extractPeriodDataFromWitResponse =  (witData: JSONObject): JSONObject => {
    const number = extractNumberFromWitResponse(witData);
    const dateRange = extractDateRangeFromWitResponse(witData);
    const duration = extractDurationFromWitResponse(witData);
    
    return { number, dateRange, duration };
}
 

// ----- Supportive methods - Periods -----

/**
 * "message": "What is the data for 2026 ?"
 * 
 * ===> 
{
    "wit": {
        "entities": {
            "wit$number:number": [
                {
                    "body": "2026",
                    "confidence": 1,
                    "end": 25,
                    "entities": {},
                    "id": "1409414583644241",
                    "name": "wit$number",
                    "role": "number",
                    "start": 21,
                    "type": "value",
                    "value": 2026
                }
            ]
        },
        "intents": [
            {
                "confidence": 0.9998401658941259,
                "id": "1010809274531713",
                "name": "predict_population"
            }
        ],
        "text": "what is the data for 2026",
        "traits": {}
    }
}
 */
const extractNumberFromWitResponse = (witData: JSONObject): JSONObject[] | null => {
    const numberEntities = witData?.entities?.['wit$number:number'];

    if (!numberEntities) return null;
    const values: JSONObject[] = [];
    numberEntities.forEach((item: JSONObject) => {
        if (typeof item.value === 'number') {
            values.push({grain: item.grain, value: item.value}); // "grain" is "month" or "year"
        }
    });

    return values;
}

/**
 * "message": "what is the data for next 4 year and last 5 years" (type "interval")
 * "message": "what is the data in 2025 / on Jan 2025" (type "value")
 * 
 * ==========>
 * {
    "wit": {
        "entities": {
            "wit$datetime:datetime": [
                {
                    "body": "next 5 years",
                    "confidence": 0.9995,
                    "end": 44,
                    "entities": {},
                    "from": {
                        "grain": "year",
                        "value": "2026-01-01T00:00:00.000-08:00"
                    },
                    "id": "680682288011602",
                    "name": "wit$datetime",
                    "role": "datetime",
                    "start": 32,
                    "to": {
                        "grain": "year",
                        "value": "2031-01-01T00:00:00.000-08:00"
                    },
                    "type": "interval",
                    "values": [
                        {
                            "from": {
                                "grain": "year",
                                "value": "2026-01-01T00:00:00.000-08:00"
                            },
                            "to": {
                                "grain": "year",
                                "value": "2031-01-01T00:00:00.000-08:00"
                            },
                            "type": "interval"
                        }
                    ]
                }
            ]
        },
        "intents": [
            {
                "confidence": 0.9999673377228697,
                "id": "1010809274531713",
                "name": "predict_population"
            }
        ],
        "text": "Give me population forecast for next 5 years",
        "traits": {}
    }
}
 */
const extractDateRangeFromWitResponse = (witResponse: JSONObject): JSONObject[] | null => {
    const datetimeEntities = witResponse.wit.entities["wit$datetime:datetime"];
    
    if (!datetimeEntities) return null;
    
    const values: JSONObject[] = [];
    datetimeEntities.forEach((item: JSONObject) => {
        const { type, from, to, value, grain } = item;
        
        if (type === 'interval') {
            // "from": {
            //     "grain": "year", // "month"
            //     "value": "2026-01-01T00:00:00.000-08:00"
            // },
            // "to": {
            //     "grain": "year", // "month"
            //     "value": "2030-01-01T00:00:00.000-08:00"
            // },
            values.push({ from, to });
        }
        
        if (type === 'value') {
            values.push({ fromDate: {grain, value}, toDate: {grain, value} });
        }
    })
    
    return values;
}

/**
 * "what is the data for 5 years ?"
 * 
 * ======>
 * {
    "wit": {
        "entities": {
            "wit$duration:duration": [
                {
                    "Year": 5,
                    "body": "5 years",
                    "confidence": 0.9995,
                    "end": 39,
                    "entities": {},
                    "id": "715028940983070",
                    "name": "wit$duration",
                    "normalized": {
                        "unit": "second",
                        "value": 157680000
                    },
                    "role": "duration",
                    "start": 32,
                    "type": "value",
                    "unit": "year",
                    "value": 5
                }
            ]
        },
        "intents": [
            {
                "confidence": 0.9999655497017356,
                "id": "1010809274531713",
                "name": "predict_population"
            }
        ],
        "text": "Give me population forecast for 5 years",
        "traits": {}
    }
}
 * @returns 
 */
const extractDurationFromWitResponse = (witResponse: JSONObject): JSONObject[] | null => {
    const durationEntities = witResponse.wit.entities['wit$duration:duration'];
  
    if (durationEntities) return null;
    
    const values: JSONObject[] = [];
    durationEntities.forEach((item: JSONObject) => {
        if (
            typeof item.value === 'number' &&
            typeof item.unit === 'string'
          ) {
            values.push({ value: item.value, grain: item.unit }); // "grain" ==> "month" / "year"; value ==> a number
          }
    })
  
    return values;
}

const createPeriod = (data: JSONObject): IPeriod => {
    const date = new Date(data.value);
    const year = date.getFullYear() + "";
    let monthStr = "";
    
    if (data.grain === "month") {
        const month = date.getMonth() + 1;
        monthStr = (month + "").padStart(2, '0');
    }
    
    return generatePeriodByCode(year + monthStr);
}

const removeDuplicatePeriods = (periods: IPeriod[]): IPeriod[] => {
    const uniqueMap = new Map<string, IPeriod>();
  
    for (const period of periods) {
      if (!uniqueMap.has(period.code)) {
        uniqueMap.set(period.code, period);
      }
    }
  
    return Array.from(uniqueMap.values());
}


// ----- Supportive methods - Data Elements -----

const extractDataElements = (witResponse: JSONObject): string[] => {
    const deEntities = witResponse.wit.entities['data_element:data_element'];
    
    const values: string[] = deEntities.map((item: JSONObject) => item.value);
    return values;
}

// ----- Supportive methods - OrgUnit List -----

const extractOrgUnits = (witResponse: JSONObject): string[] => {
    const orgUnitEntities = witResponse.wit.entities['org_unit:org_unit'];
    
    const values: string[] = orgUnitEntities.map((item: JSONObject) => item.value);
    return values;
}