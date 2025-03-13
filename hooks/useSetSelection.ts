import { clearSelection, setApprovalData, setDataSet, setOrgUnit, setPeriod } from '@/store/selectionSlice';
import { AppDispatch } from "@/store/store"
import { IApprovalData, IDataSet, IOrgUnit, ISerializePeriod } from "@/types/definations";
import { useCallback } from "react";
import { useDispatch } from "react-redux"

export const useSetSelection = () => {
    
    const dispatch = useDispatch<AppDispatch>();
    
    // Menoize the callback for performance
    const selectDataSet = useCallback((data: IDataSet) => {
        dispatch(setDataSet(data));
    }, [dispatch]);
    
    const selectPeriod = useCallback((data: ISerializePeriod) => {
        dispatch(setPeriod(data));
    }, [dispatch]);
    
    const selectOrgUnit = useCallback((data: IOrgUnit) => {
        dispatch(setOrgUnit(data));
    }, [dispatch]);
    
    const selectApprovalData = useCallback((data: IApprovalData | null) => {
        dispatch(setApprovalData(data));
    }, [dispatch]);
    
    
    const cleanAll = useCallback(() => {
        dispatch(clearSelection());
    }, [dispatch]);
    
    return { selectDataSet, selectPeriod, selectOrgUnit, selectApprovalData, cleanAll };
}