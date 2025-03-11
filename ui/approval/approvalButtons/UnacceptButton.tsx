import useAsyncData from "@/hooks/useAsyncData";
import { useSelection } from "@/hooks/useSelection";
import { useSetSelection } from "@/hooks/useSetSelection";
import { IApprovalData } from "@/types/definations";
import { deleteData } from "@/utils/apiClient";

export default function UnacceptButton () {
    const { selectedDataSet, selectedPeriod, selectedOrgUnit, approvalData} = useSelection();
    const { loading, error, refetch } = useAsyncData<IApprovalData>();
    const { selectApprovalData } = useSetSelection();
    
    const unacceptData = async (): Promise<IApprovalData> => {
        const payload = {
            dataSet: selectedDataSet!._id,
            period: selectedPeriod?.code,
            orgUnit: selectedOrgUnit?._id,
        }
        
        const result = await deleteData<IApprovalData, any>("/api/approvalData/accept", payload);
        selectApprovalData(result);
        
        return result;
    }
    
    return (
        <button 
            onClick={() => refetch(unacceptData)}
            className="bg-orange-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
            // disabled={!!approvalData?.acceptedBy} // Convert acceptedBy to a boolean
        >
            Un-Accept
        </button>
    )
}