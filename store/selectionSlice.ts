import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IApprovalData, IDataSet, IOrgUnit, IPeriod, ISerializePeriod } from './../types/definations';

interface SelectionState {
    dataSet: IDataSet | null;
    period: ISerializePeriod | null;
    orgUnit: IOrgUnit | null;
    approvalData: IApprovalData | null;
}

const initialState: SelectionState = {
    dataSet: null,
    period: null,
    orgUnit: null,
    approvalData: null,
}

const selectionSlide = createSlice({
    name: "selection",
    initialState,
    
    reducers: {
        setDataSet: (state, action: PayloadAction<IDataSet>) => {
            if (state.dataSet?._id !== action.payload._id) { // Avoid unnecessary updates
                state.dataSet = action.payload;
                state.period = null;
                state.orgUnit = null;
                state.approvalData = null;
            }
        },
        setPeriod: (state, action: PayloadAction<ISerializePeriod>) => {
            if (state.period?.code !== action.payload.code) { // Check if period is actually changing
                state.period = action.payload;
                state.approvalData = null;
            }
        },
        setOrgUnit: (state, action: PayloadAction<IOrgUnit>) => {
            if (state.orgUnit?._id !== action.payload._id) { // Check if orgUnit is actually changing
                state.orgUnit = action.payload;
                state.approvalData = null;
            }
        },
        setApprovalData: (state, action: PayloadAction<IApprovalData | null>) => {
            const oldApprovalData = state.approvalData;
            const newApprovalData = action.payload;
            if (
                (oldApprovalData && !action.payload)||
                (!oldApprovalData && action.payload)||
                (oldApprovalData && newApprovalData && oldApprovalData._id !== newApprovalData._id)
            ) {
                state.approvalData = action.payload;
            }
        },
        clearSelection: (state) => {
            if (state.dataSet || state.period || state.orgUnit || state.approvalData) {
                state.dataSet = null;
                state.period = null;
                state.orgUnit = null;
                state.approvalData = null;
            }
        }
    }
})

export const { setDataSet, setPeriod, setOrgUnit, setApprovalData, clearSelection } = selectionSlide.actions;

const selectionReducer = selectionSlide.reducer;
export default selectionReducer;
