import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDataSet, IOrgUnit, IPeriod, ISerializePeriod } from './../types/definations';

interface SelectionState {
    dataSet: IDataSet | null;
    period: ISerializePeriod | null;
    orgUnit: IOrgUnit | null;
}

const initialState: SelectionState = {
    dataSet: null,
    period: null,
    orgUnit: null,
}

const selectionSlide = createSlice({
    name: "selection",
    initialState,
    
    reducers: {
        setDataSet: (state, action: PayloadAction<IDataSet>) => {
            state.dataSet = action.payload;
            state.period = null;
            state.orgUnit = null;
        },
        setPeriod: (state, action: PayloadAction<ISerializePeriod>) => {
            state.period = action.payload;
        },
        setOrgUnit: (state, action: PayloadAction<IOrgUnit>) => {
            state.orgUnit = action.payload;
        },
        clearSelection: (state) => {
            state.dataSet = null;
            state.period = null;
            state.orgUnit = null;
        }
    }
})

export const { setDataSet, setPeriod, setOrgUnit, clearSelection } = selectionSlide.actions;

const selectionReducer = selectionSlide.reducer;
export default selectionReducer;
