import useAsyncData from "@/hooks/useAsyncData";
import { useSelection } from "@/hooks/useSelection";
import { IApprovalData } from "@/types/definations";
import { post } from "@/utils/apiClient";
import { useEffect } from "react";

export default function ApproveButton( ) {
    
    const { selectedDataSet, selectedPeriod, selectedOrgUnit, approvalData, selectApprovalData } = useSelection();
    const { loading, error, refetch } = useAsyncData<IApprovalData | null>();
    
    const approveData = async (): Promise<IApprovalData | null> => {
        const payload = {
            dataSet: selectedDataSet!._id,
            period: selectedPeriod?.code,
            orgUnit: selectedOrgUnit?._id,
            approvedBy: "67cfb5d42edec25886c547a4",
        }
        
        const result = await post<IApprovalData, any>("/api/approvalData/approve", payload);
        selectApprovalData(result);
        
        return result;
    }
    
    
    return (
        <button 
            onClick={() => refetch(approveData)}
            className="bg-teal-700 text-white hover:bg-teal-600 border-2 border-gray-200 disabled:bg-gray-400 px-4 py-2 rounded transition-all duration-300 transform hover:scale-105"
            disabled={loading}
        >
            Approve
        </button>
    )
}