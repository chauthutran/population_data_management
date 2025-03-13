import { RootState } from "@/store/store";
import { useMemo } from "react";
import { shallowEqual, useSelector } from "react-redux";

export const useSelection = () => {
    const selectedDataSet = useSelector((state: RootState) => state.selection.dataSet, shallowEqual);
    const selectedPeriod = useSelector((state: RootState) => state.selection.period, shallowEqual);
    const selectedOrgUnit = useSelector((state: RootState) => state.selection.orgUnit, shallowEqual);
    const approvalData = useSelector((state: RootState) => state.selection.approvalData, shallowEqual);
    
// console.log("Redux State:", { selectedDataSet, selectedPeriod, selectedOrgUnit });

    return { selectedDataSet, selectedPeriod, selectedOrgUnit, approvalData };
    
    // return useMemo(() => ({
    //     selectedDataSet,
    //     selectedPeriod,
    //     selectedOrgUnit
    // }), [selectedDataSet, selectedPeriod, selectedOrgUnit]);
}