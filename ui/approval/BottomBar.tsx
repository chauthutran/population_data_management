import useAsyncData from "@/hooks/useAsyncData";
import ApproveButton from "./approvalButtons/ApproveButton";
import { IApprovalData } from "@/types/definations";
import { useEffect } from "react";
import { useSelection } from "@/hooks/useSelection";
import AcceptButton from "./approvalButtons/AcceptButton";
import { useSetSelection } from "@/hooks/useSetSelection";
import { post } from "@/utils/apiClient";
import { setApprovalData } from "@/store/selectionSlice";
import UnapproveButton from "./approvalButtons/UnapproveButton";
import UnacceptButton from "./approvalButtons/UnacceptButton";

export default function ApprovalButtonBar () {
    
    const { selectedDataSet, selectedPeriod, selectedOrgUnit, approvalData } = useSelection();
    const { selectApprovalData } = useSetSelection();
    
    const { data, loading, error, refetch } = useAsyncData<IApprovalData>();
    
    useEffect(() => {
        console.log(" ============== ApprovalButtonBar - useEffect");
        if (selectedDataSet && selectedPeriod && selectedOrgUnit) {
            refetch(fetchData);
        }
    }, [selectedDataSet, selectedPeriod, selectedOrgUnit]);
    
    const fetchData = async (): Promise<IApprovalData> => {
        const payload = {
            dataSet: selectedDataSet!._id,
            period: selectedPeriod?.code,
            orgUnit: selectedOrgUnit?._id,
        }
        
        const result = await post<IApprovalData, any>("/api/approvalData", payload);
        selectApprovalData(result);
        
        return result;
    }
    
    if (selectedDataSet === null || selectedPeriod === null || selectedOrgUnit === null) return (<></>);
    
    if (loading) return (<>Loading ...</>);
    
    return (
        <div className="flex space-x-4 my-4">
            {(!approvalData || !approvalData.approvedBy) && <ApproveButton />}
            {(approvalData && approvalData.approvedBy && !approvalData.acceptedBy) && <UnapproveButton />}
            {(approvalData && !approvalData.acceptedBy) &&  <AcceptButton /> }
            {(approvalData && approvalData.acceptedBy) && <UnacceptButton />}
        </div>
    )
}