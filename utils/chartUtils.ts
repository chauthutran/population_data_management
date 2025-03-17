import { IDataElement, IOrgUnit, ISerializePeriod, JSONObject } from "@/types/definations";
import { post } from "./apiClient";

export const retrieveAndTransformData = async (periods: ISerializePeriod[], dataElements: IDataElement[], orgUnit: IOrgUnit, orgUnitLevel: JSONObject): Promise<Record<string, string>[]> => {

    const payload = {
                periods: periods.map((item) => item.code),
                dataElements: dataElements.map((item) => item._id),
                orgUnit: orgUnit._id,
                orgUnitLevel: orgUnitLevel._id
            }

    const data = await post<JSONObject[], any>("/api/charts", payload);

    const transformedData = data.reduce((acc, item) => {
        const periodName = item.period.name;
        if (!acc[periodName]) {
            acc[periodName] = { period: periodName };
        }
        acc[periodName][item.dataElement.name] = item.value;
        return acc;
    }, {}) as Record<string, string>[];
    
    return Object.values(transformedData);
}