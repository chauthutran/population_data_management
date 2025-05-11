import {
    clearSelection,
    setApprovalData,
    setDataSet,
    setOrgUnit,
    setPeriod,
} from '@/store/selectionSlice';
import { AppDispatch, RootState } from '@/store/store';
import {
    IApprovalData,
    IDataSet,
    IOrgUnit,
    ISerializePeriod,
} from '@/types/definations';
import { useCallback, useMemo } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

export const useSelection = () => {
    const dispatch = useDispatch<AppDispatch>();

    const selectedDataSet = useSelector(
        (state: RootState) => state.selection.dataSet,
        shallowEqual,
    );
    const selectedPeriod = useSelector(
        (state: RootState) => state.selection.period,
        shallowEqual,
    );
    const selectedOrgUnit = useSelector(
        (state: RootState) => state.selection.orgUnit,
        shallowEqual,
    );
    const selectedApprovalData = useSelector(
        (state: RootState) => state.selection.approvalData,
        shallowEqual,
    );

    // Menoize the callback for performance
    const selectDataSet = useCallback(
        (data: IDataSet) => {
            dispatch(setDataSet(data));
        },
        [dispatch],
    );

    const selectPeriod = useCallback(
        (data: ISerializePeriod) => {
            dispatch(setPeriod(data));
        },
        [dispatch],
    );

    const selectOrgUnit = useCallback(
        (data: IOrgUnit) => {
            dispatch(setOrgUnit(data));
        },
        [dispatch],
    );

    const selectApprovalData = useCallback(
        (data: IApprovalData | null) => {
            dispatch(setApprovalData(data));
        },
        [dispatch],
    );

    const cleanAll = useCallback(() => {
        dispatch(clearSelection());
    }, [dispatch]);

    return {
        selectedDataSet,
        selectedPeriod,
        selectedOrgUnit,
        selectedApprovalData,
        selectDataSet,
        selectPeriod,
        selectOrgUnit,
        selectApprovalData,
        cleanAll,
    };
};
