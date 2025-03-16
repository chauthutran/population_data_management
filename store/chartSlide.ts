import { IDataElement, IOrgUnit, ISerializePeriod, JSONObject } from "@/types/definations";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChartState {
    periods: ISerializePeriod[] | null,
    dataElements: IDataElement[] | null,
    orgUnit: IOrgUnit | null,
    orgUnitLevel: JSONObject | null,
    chartType: JSONObject | null,
}

const initialState: ChartState = {
    periods: null,
    dataElements: null,
    orgUnit: null,
    orgUnitLevel: null,
    chartType: null,
}

const chartSlice = createSlice({
    name: "chart",
    initialState,
    
    reducers: {
        setPeriods: (state, action: PayloadAction<ISerializePeriod[] | null>) => {
            state.periods = action.payload;
        },
        setDataElements: (state, action: PayloadAction<IDataElement[] | null>) => {
            state.dataElements = action.payload;
        },
        setOrgUnit: (state, action: PayloadAction<IOrgUnit | null>) => {
            state.orgUnit = action.payload;
        },
        setOrgUnitLevel: (state, action: PayloadAction<JSONObject | null>) => {
            state.orgUnitLevel = action.payload;
        },
        setChartType: (state, action: PayloadAction<JSONObject | null>) => {
            state.chartType = action.payload;
        },
        clearSelection: (state) => {
            if (state.periods || state.dataElements || state.orgUnit || state.orgUnitLevel) {
                state.periods = null;
                state.dataElements = null;
                state.orgUnit = null;
                state.orgUnitLevel = null;
            }
        }
    }
});

export const { setPeriods, setDataElements, setOrgUnit, setOrgUnitLevel, setChartType, clearSelection } = chartSlice.actions;

const chartReducer = chartSlice.reducer;
export default chartReducer;
