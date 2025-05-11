import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    IApprovalData,
    IDataSet,
    IOrgUnit,
    ISerializePeriod,
} from '../types/definations';
import {
    initDataSet,
    initPeriod,
    orgUnitDistrictA1,
} from '@/constants/initData';

interface DataEntryState {
    dataSet: IDataSet | null;
    period: ISerializePeriod | null;
    orgUnit: IOrgUnit | null;
    approvalData: IApprovalData | null;
}

const initialState: DataEntryState = {
    dataSet: initDataSet,
    period: initPeriod,
    orgUnit: orgUnitDistrictA1,
    approvalData: null,
};

const dataEntrySlice = createSlice({
    name: 'dataEntry',
    initialState,

    reducers: {
        setDataSet: (state, action: PayloadAction<IDataSet>) => {
            if (state.dataSet?._id !== action.payload._id) {
                // Avoid unnecessary updates
                state.dataSet = action.payload;
                state.period = null;
                state.orgUnit = null;
            }
        },
        setPeriod: (state, action: PayloadAction<ISerializePeriod>) => {
            if (state.period?.code !== action.payload.code) {
                // Check if period is actually changing
                state.period = action.payload;
            }
        },
        setOrgUnit: (state, action: PayloadAction<IOrgUnit>) => {
            if (state.orgUnit?._id !== action.payload._id) {
                // Check if orgUnit is actually changing
                state.orgUnit = action.payload;
            }
        },
        setApprovalData: (state, action: PayloadAction<IApprovalData>) => {
            state.approvalData = action.payload;
        },
        clearSelection: (state) => {
            if (state.dataSet || state.period || state.orgUnit) {
                state.dataSet = null;
                state.period = null;
                state.orgUnit = null;
                state.approvalData = null;
            }
        },
    },
});

export const {
    setDataSet,
    setPeriod,
    setOrgUnit,
    clearSelection,
    setApprovalData,
} = dataEntrySlice.actions;

const dataEntryReducer = dataEntrySlice.reducer;
export default dataEntryReducer;
