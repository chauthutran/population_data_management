import { initChartType, initChartX, initChartY, initDataElements, initOrgUnitLevel, initPeriods, orgUnitRoot } from './../constants/initData';
import { IChartAxist, IDataElement, IOrgUnit, IPeriodType, ISerializePeriod } from "@/types/definations"
import chartReducer, { setChartType, setChartX, setChartY, setDataElements, setOrgUnit, setOrgUnitLevel, setPeriods } from './chartSlide';

describe('chartSlide', () => {
    const mockYearlyPeriodType: IPeriodType = { _id: "peType1", name: "Yearly"};
    const mockPeriod: ISerializePeriod = { _id: "2024", name: "2024", code: "2024", startDate: "2024-01-01T00:00:00", endDate: "2024-12-31T23:59:59" };
    const mockDataElement: IDataElement = { _id: "de1", name: "Data Element 1", shortName: "DE 1", description: "", periodType: mockYearlyPeriodType };
    
    const mockOrgUnit: IOrgUnit = { _id: "ou1", name: "Province 1", code: "prov1", parent: "root", level: 2};

    const mockLevel = {_id: "l3", name: "Level 3"};
    
    const mockChartType = { name: 'Bar', icon: 'AiOutlineBarChart' };
    const mockChartX: IChartAxist = { _id: 'orgUnit', name: 'OrgUnit' };
    const mockChartY: IChartAxist = { _id: 'dataElement', name: 'Data Element' };
    
    const initialState = {
        periods: initPeriods,
        dataElements: initDataElements,
        orgUnit: orgUnitRoot,
        orgUnitLevel: initOrgUnitLevel,
        chartX: initChartX,
        chartY: initChartY,
        chartType: initChartType,
    };
    
    it("should return initial state", () => {
        const state = chartReducer(undefined, {type: ""});
        expect(state).toEqual(initialState);
    });
    
    it("should handle setPeriods", () => {
        const newState = chartReducer(initialState, setPeriods([mockPeriod]));
        expect(newState.periods).toEqual([mockPeriod]);
    });
    
    it("should handle setPeriods", () => {
        const newState = chartReducer(initialState, setDataElements([mockDataElement]));
        expect(newState.dataElements).toEqual([mockDataElement]);
    });
    
    it("should handle setOrgUnit", () => {
        const newState = chartReducer(initialState, setOrgUnit(mockOrgUnit));
        expect(newState.orgUnit).toEqual(mockOrgUnit);
    });
    
    it("should handle setOrgUnitLevel", () => {
        const newState = chartReducer(initialState, setOrgUnitLevel(mockLevel));
        expect(newState.orgUnitLevel).toEqual(mockLevel);
    });
    
    it("shoould handle setChartType", () => {
        const newState = chartReducer(initialState, setChartType(mockChartType));
        expect(newState.chartType).toEqual(mockChartType)
    });
    
    it("shoould handle setChartX", () => {
        const newState = chartReducer(initialState, setChartX([mockChartX]));
        expect(newState.chartX).toEqual([mockChartX]);
    });
    
    it("shoould handle setChartY", () => {
        const newState = chartReducer(initialState, setChartY([mockChartY]));
        expect(newState.chartY).toEqual([mockChartY]);
    });
})