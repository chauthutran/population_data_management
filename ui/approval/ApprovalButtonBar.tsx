import useAsyncData from "@/hooks/useAsyncData";
import ApproveButton from "./approvalButtons/ApproveButton";
import { IApprovalData } from "@/types/definations";
import { useEffect } from "react";
import { useSelection } from "@/hooks/useSelection";
import AcceptButton from "./approvalButtons/AcceptButton";
import { post } from "@/utils/apiClient";
import UnapproveButton from "./approvalButtons/UnapproveButton";
import UnacceptButton from "./approvalButtons/UnacceptButton";
import { getApprovalStatus } from "@/utils/dataValueUtils";
import { DATA_ACCEPTED, DATA_APPROVED, DATA_UNAPPROVED } from "@/constants";

export default function ApprovalButtonBar () {
    const { selectedDataSet, selectedPeriod, selectedOrgUnit, selectedApprovalData, selectApprovalData } = useSelection();
    
    const { data, error, refetch, loading } = useAsyncData<IApprovalData>();
    
    const fetchData = async (): Promise<IApprovalData> => {
        const payload = {
            dataSet: selectedDataSet!._id,
            period: selectedPeriod?.code,
            orgUnit: selectedOrgUnit?._id,
        }
        
        const approvalData = await post<IApprovalData, any>("/api/approvalData", payload);
        selectApprovalData(approvalData);
        
        return approvalData;
    }
    
    useEffect(() => {
        if (selectedDataSet && selectedPeriod && selectedOrgUnit) {
            refetch(fetchData);
        }
    }, [selectedDataSet?._id, selectedPeriod?.code, selectedOrgUnit?._id]);
    
    
    if (selectedDataSet === null || selectedPeriod === null || selectedOrgUnit === null) return (<></>);
    
    if (loading) return (<>Loading ...</>);
    
    
    const approvalStatus = getApprovalStatus(selectedApprovalData);

    return (
        <div className="flex space-x-4 my-4">
            {approvalStatus === DATA_UNAPPROVED && <ApproveButton />}
            {approvalStatus === DATA_APPROVED && <>
                <UnapproveButton />
                <AcceptButton />
            </>}
            {approvalStatus === DATA_ACCEPTED && <UnacceptButton />}
        </div>
    )
}