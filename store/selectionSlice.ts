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
            state.dataSet = action.payload;
            state.period = null;
            state.orgUnit = null;
            state.approvalData = null;
        },
        setPeriod: (state, action: PayloadAction<ISerializePeriod>) => {
            state.period = action.payload;
            state.approvalData = null;
        },
        setOrgUnit: (state, action: PayloadAction<IOrgUnit>) => {
            state.orgUnit = action.payload;
            state.approvalData = null;
        },
        setApprovalData: (state, action: PayloadAction<IApprovalData | null>) => {
            state.approvalData = action.payload;
        },
        clearSelection: (state) => {
            state.dataSet = null;
            state.period = null;
            state.orgUnit = null;
            state.approvalData = null;
        }
    }
})

export const { setDataSet, setPeriod, setOrgUnit, setApprovalData, clearSelection } = selectionSlide.actions;

const selectionReducer = selectionSlide.reducer;
export default selectionReducer;
