import { setDataElements } from '@/store/chartSlide';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    IDataElement,
    IOrgUnit,
    ISerializePeriod,
} from '../types/definations';
import {
    initDataElements,
    initPeriod,
    orgUnitDistrictA1,
} from '@/constants/initData';

interface DataEntryState {
    dataElement: IDataElement | null;
    period: ISerializePeriod | null;
    orgUnit: IOrgUnit | null;
}

const initialState: DataEntryState = {
    dataElement: initDataElements[0],
    period: initPeriod,
    orgUnit: orgUnitDistrictA1,
};

const forecastSlice = createSlice({
    name: 'forecast',
    initialState,

    reducers: {
        setDataElement: (state, action: PayloadAction<IDataElement>) => {
            if (state.dataElement?._id !== action.payload._id) {
                // Avoid unnecessary updates
                state.dataElement = action.payload;
                state.period = null;
            }
        },
        setPeriod: (state, action: PayloadAction<ISerializePeriod>) => {
            // Check if period is actually changing
            if (state.period?.code !== action.payload.code) {
                state.period = action.payload;
            }
        },
        setOrgUnit: (state, action: PayloadAction<IOrgUnit>) => {
            if (state.orgUnit?._id !== action.payload._id) {
                // Check if orgUnit is actually changing
                state.orgUnit = action.payload;
            }
        },
        clearSelection: (state) => {
            if (state.dataElement || state.period || state.orgUnit) {
                state.dataElement = null;
                state.period = null;
                state.orgUnit = null;
            }
        },
    },
});

export const {
    setDataElement,
    setPeriod,
    setOrgUnit,
    clearSelection,
} = forecastSlice.actions;

const forecastReducer = forecastSlice.reducer;
export default forecastReducer;
