import { IDataValue, JSONObject } from "@/types/definations";

export const createDataValues = (dataValueMap: JSONObject, periodCode: string, orgUnitId: string) => {
    const result = [];
    for( var deId in dataValueMap)
    {
        const item = {
            dataElement: deId,
            period: periodCode,
            orgUnit: orgUnitId,
            value: dataValueMap[deId]
        }
        
        result.push(item);
    }
    
    return result;
}

export const convertDataValuesToMap = (dataValues: IDataValue[]): Record<string, string> => {
    return dataValues.reduce((acc, dv: IDataValue) => {
        acc[dv.dataElement._id] = dv.value;
        return acc;
    }, {} as Record<string, string>);
}