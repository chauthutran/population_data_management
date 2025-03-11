import useAsyncData from "@/hooks/useAsyncData";
import { useSelection } from "@/hooks/useSelection";
import { useSetSelection } from "@/hooks/useSetSelection";
import { IApprovalData } from "@/types/definations";
import { post } from "@/utils/apiClient";
import { useEffect } from "react";

export default function AcceptButton () {
    const { selectedDataSet, selectedPeriod, selectedOrgUnit, approvalData} = useSelection();
    const { loading, error, refetch } = useAsyncData<IApprovalData>();
    const { selectApprovalData } = useSetSelection();
    
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
            className="bg-orange-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
            // disabled={!!approvalData?.acceptedBy} // Convert acceptedBy to a boolean
        >
            Accept
        </button>
    )
}