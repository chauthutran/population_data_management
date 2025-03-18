import { IDataElement, IOrgUnit, ISerializePeriod, JSONObject } from "@/types/definations";
import { post } from "./apiClient";

export const retrieveAndTransformData = async (periods: ISerializePeriod[], dataElements: IDataElement[], orgUnit: IOrgUnit, orgUnitLevel: JSONObject): Promise<JSONObject[]> => {

    const payload = {
                periods: periods.map((item) => item.code),
                dataElements: dataElements.map((item) => item._id),
                orgUnit: orgUnit._id,
                orgUnitLevel: orgUnitLevel._id
            }

    return await post<JSONObject[], any>("/api/charts", payload);
}