import useAsyncData from "@/hooks/useAsyncData";
import { useSelection } from "@/hooks/useSelection";
import { IApprovalData } from "@/types/definations";
import { post } from "@/utils/apiClient";
import React, { useEffect } from "react";

const AcceptButton = () => {
    const { selectedDataSet, selectedPeriod, selectedOrgUnit, selectApprovalData} = useSelection();
    const { loading, error, refetch } = useAsyncData<IApprovalData>();
    
    const acceptData = async (): Promise<IApprovalData> => {
        const payload = {
            dataSet: selectedDataSet!._id,
            period: selectedPeriod?.code,
            orgUnit: selectedOrgUnit?._id,
            acceptedBy: "67cfb5d42edec25886c547a4",
        }
        
        const result = await post<IApprovalData, any>("/api/approvalData/accept", payload);
        selectApprovalData(result);
        
        return result;
    }
    
    return (
        <button 
            onClick={() => refetch(acceptData)}
            disabled={loading}
            className="w-auto bg-green-700 hover:bg-green-600 border border-gray-200 text-white rounded-lg disabled:bg-gray-400 py-3 px-6 transition-all duration-300 transform hover:scale-105"
        >
            Accept
        </button>
    )
}

export default AcceptButton;