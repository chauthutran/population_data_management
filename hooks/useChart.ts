import { clearSelection, setDataElements, setOrgUnit, setOrgUnitLevel, setPeriods, setChartType, setChartX, setChartY } from "@/store/chartSlide";
import { AppDispatch, RootState } from "@/store/store";
import { IChartAxist, IDataElement, IOrgUnit, ISerializePeriod, JSONObject } from "@/types/definations";
import { useCallback } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

export const useChart = () => {
    const dispatch = useDispatch<AppDispatch>();
    
    const selectedPeriods = useSelector((state: RootState) => state.chart.periods, shallowEqual);
    const selectedDataElements = useSelector((state: RootState) => state.chart.dataElements, shallowEqual);
    const selectedOrgUnit = useSelector((state: RootState) => state.chart.orgUnit, shallowEqual);
    const selectedOrgUnitLevel = useSelector((state: RootState) => state.chart.orgUnitLevel, shallowEqual);
    const selectedChartX = useSelector((state: RootState) => state.chart.chartX, shallowEqual);
    const selectedChartY = useSelector((state: RootState) => state.chart.chartY, shallowEqual);
    const selectedChartType = useSelector((state: RootState) => state.chart.chartType, shallowEqual);

    // Menoize the callback for performance
    const selectPeriods = useCallback((periods: ISerializePeriod[] | null) => {
        dispatch(setPeriods(periods));
    }, [dispatch]);
        
    const selectDataElements = useCallback((dataElements: IDataElement[] | null) => {
        dispatch(setDataElements(dataElements));
    }, [dispatch]);
        
    const selectOrgUnit = useCallback((orgUnit: IOrgUnit | null) => {
        dispatch(setOrgUnit(orgUnit));
    }, [dispatch]);
        
    const selectOrgUnitLevel = useCallback((orgUnitLevel: JSONObject | null) => {
        dispatch(setOrgUnitLevel(orgUnitLevel));
    }, [dispatch]);
        
    const selectChartX = useCallback((chartX: IChartAxist[]) => {
        dispatch(setChartX(chartX));
    }, [dispatch]);
        
    const selectChartY = useCallback((chartY: IChartAxist[]) => {
        dispatch(setChartY(chartY));
    }, [dispatch]);
        
    const selectChartType = useCallback((chartType: JSONObject | null) => {
        dispatch(setChartType(chartType));
    }, [dispatch]);
        
    const cleanAll = useCallback(() => {
        dispatch(clearSelection());
    }, [dispatch]);
    
    return {
        selectedPeriods, selectedDataElements, selectedOrgUnit, selectedOrgUnitLevel, selectedChartX, selectedChartY, selectedChartType,
        selectPeriods, selectDataElements, selectOrgUnit, selectOrgUnitLevel, selectChartX, selectChartY, selectChartType, cleanAll
    };
}