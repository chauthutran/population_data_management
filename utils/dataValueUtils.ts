import { DATA_ACCEPTED, DATA_APPROVED, DATA_UNAPPROVED } from '@/constants';
import { IApprovalData, IDataValue, JSONObject } from '@/types/definations';

export const createDataValues = (
    dataValueMap: JSONObject,
    periodCode: string,
    orgUnitId: string,
) => {
    const result = [];
    for (var deId in dataValueMap) {
        const item = {
            dataElement: deId,
            period: periodCode,
            orgUnit: orgUnitId,
            value: dataValueMap[deId],
        };

        result.push(item);
    }

    return result;
};

export const convertDataValuesToMap = (
    dataValues: IDataValue[],
): Record<string, string> => {
    return dataValues.reduce(
        (acc, dv: IDataValue) => {
            acc[dv.dataElement._id] = dv.value;
            return acc;
        },
        {} as Record<string, string>,
    );
};

export const getApprovalStatus = (
    approvalData: IApprovalData | null,
): string => {
    if (!approvalData || !approvalData.approvedBy) {
        return DATA_UNAPPROVED;
    }

    if (approvalData && approvalData.approvedBy && !approvalData.acceptedBy) {
        return DATA_APPROVED; // APPROVED
    }

    // if (approvalData && approvalData.acceptedBy) {
    return DATA_ACCEPTED; // ACCEPTED
    // }
};
