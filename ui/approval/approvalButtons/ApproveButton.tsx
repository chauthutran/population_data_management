import useAsyncData from "@/hooks/useAsyncData";
import { useSelection } from "@/hooks/useSelection";
import { useSetSelection } from "@/hooks/useSetSelection";
import { IApprovalData } from "@/types/definations";
import { post } from "@/utils/apiClient";
import { useEffect } from "react";

export default function ApproveButton( ) {
    
    const { selectedDataSet, selectedPeriod, selectedOrgUnit, approvalData} = useSelection();
    const { data, loading, error, refetch } = useAsyncData<IApprovalData>();
    const { selectApprovalData } = useSetSelection();
    
    const approveData = async (): Promise<IApprovalData> => {
        const payload = {
            dataSet: selectedDataSet!._id,
            period: selectedPeriod?.code,
            orgUnit: selectedOrgUnit?._id,
            approvedBy: "67cfb5d42edec25886c547a4",
        }
        
        const result = await post<IApprovalData, any>("/api/approvalData/approve", payload);
        selectApprovalData(data!);
        
        return result;
    }
    
    return (
        <button 
            onClick={() => refetch(approveData)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
            disabled={loading}
        >
            Approve
        </button>
    )
}