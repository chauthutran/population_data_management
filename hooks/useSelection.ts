import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

export const useSelection = () => {
    const selectedDataSet = useSelector((state: RootState) => state.selection.dataSet);
    const selectedPeriod = useSelector((state: RootState) => state.selection.period);
    const selectedOrgUnit = useSelector((state: RootState) => state.selection.orgUnit);
    const approvalData = useSelector((state: RootState) => state.selection.approvalData);
    
    return { selectedDataSet, selectedPeriod, selectedOrgUnit, approvalData };
}