import useAsyncData from "@/hooks/useAsyncData";
import ApproveButton from "./ApproveButton";
import { IApprovalData } from "@/types/definations";
import { useEffect } from "react";
import { useSelection } from "@/hooks/useSelection";
import AcceptButton from "./AcceptButton";
import { useSetSelection } from "@/hooks/useSetSelection";
import { post } from "@/utils/apiClient";
import { setApprovalData } from "@/store/selectionSlice";

export default function ApprovalButtonBar () {
    
    const { selectedDataSet, selectedPeriod, selectedOrgUnit, approvalData } = useSelection();
    const { selectApprovalData } = useSetSelection();
    
    const { data, loading, error, refetch } = useAsyncData<IApprovalData>();
    
    useEffect(() => {
        if (selectedDataSet && selectedPeriod && selectedOrgUnit) {
            refetch(fetchData);
        }
    }, [selectedDataSet, selectedPeriod, selectedOrgUnit]);
    
    // useEffect(() => {
    //     console.log("========== data 1", data);
    //     selectApprovalData(data);
    // }, [data]);
    
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
    console.log("========== data ", data);
    console.log("approvalData ", approvalData);
    return (
        <>
            {(!approvalData || !approvalData.approvedBy) && <ApproveButton />}
            {(approvalData && approvalData.approvedBy && !approvalData.acceptedBy) && <AcceptButton />}
        </>
    )
}