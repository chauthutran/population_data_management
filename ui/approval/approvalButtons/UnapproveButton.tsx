import useAsyncData from "@/hooks/useAsyncData";
import { useSelection } from "@/hooks/useSelection";
import { useSetSelection } from "@/hooks/useSetSelection";
import { IApprovalData } from "@/types/definations";
import { deleteData } from "@/utils/apiClient";

export default function UnapproveButton( ) {
    
    const { selectedDataSet, selectedPeriod, selectedOrgUnit } = useSelection();
    const { loading, error, refetch } = useAsyncData<IApprovalData>();
    const { selectApprovalData } = useSetSelection();
    
    const approveData = async (): Promise<IApprovalData> => {
        const payload = {
            dataSet: selectedDataSet!._id,
            period: selectedPeriod?.code,
            orgUnit: selectedOrgUnit?._id,
            approvedBy: "67cfb5d42edec25886c547a4",
        }
        
        const result = await deleteData<IApprovalData, any>("/api/approvalData/approve", payload);
        selectApprovalData(result);
        
        return result;
    }
    
    return (
        <button 
            onClick={() => refetch(approveData)}
            className="bg-teal-700 text-white hover:bg-teal-600 px-4 py-2 rounded transition-all duration-300 transform hover:scale-105"
            disabled={loading}
        >
            Un-Approve
        </button>
    )
}