import { IApprovalData } from "@/types/definations";
import { post } from "./apiClient";

export const getApprovalData = async (dataSetId: string, periodCode: string, orgUnitId: string) => {
    const payload = {
        dataSet: dataSetId,
        period: periodCode,
        orgUnit: orgUnitId,
    }
    
    const approvalData = await post<IApprovalData, any>("/api/approvalData", payload);
    
    return approvalData;
}